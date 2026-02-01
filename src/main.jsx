import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BookOpen, Headphones, Mic, CheckSquare, BarChart2, FileText, Youtube } from 'lucide-react'
import './index.css'

const App = () => {
  const [url, setUrl] = useState('');
  const [identity, setIdentity] = useState('student');
  const [field, setField] = useState('exam_english');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('guide');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, identity, field })
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      alert('生成失敗，請檢查後端是否啟動');
    } finally {
      setLoading(false);
    }
  };

  const exportMarkdown = () => {
    if (!data) return;
    const md = `# ${data.meta.title}\n\n## 導讀\n${data.guide}\n\n## 詞彙表\n${data.vocabulary.map(v => `- **${v.word}**: ${v.definition}\n  - *${v.example}*\n  - 💡 ${v.importance}`).join('\n')}\n\n...`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'learning-pack.md';
    link.click();
  };

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-2 flex items-center justify-center gap-3">
          <Youtube className="text-red-600" size={40} />
          YouTube 專業學習包產生器
        </h1>
        <p className="text-gray-600">專為專業人士打造的 AI 語言學習助手</p>
      </header>

      {/* Input Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">YouTube 影片連結</label>
          <input 
            type="text" 
            placeholder="https://www.youtube.com/watch?v=..." 
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">學習身份</label>
          <select 
            className="w-full border rounded-lg p-2 bg-gray-50"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
          >
            <option value="lawyer">律師</option>
            <option value="engineer">工程師</option>
            <option value="pm">產品經理</option>
            <option value="student">學生</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">學習領域</label>
          <select 
            className="w-full border rounded-lg p-2 bg-gray-50"
            value={field}
            onChange={(e) => setField(e.target.value)}
          >
            <option value="law_english">法律英文</option>
            <option value="business_negotiation">商務協商</option>
            <option value="software_engineering">軟體工程</option>
            <option value="exam_english">考試英文</option>
          </select>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading || !url}
          className="md:col-span-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {loading ? '生成中...' : '開始生成學習包'}
        </button>
      </div>

      {/* Content Section */}
      {data && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[500px]">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'guide', label: '導讀', icon: FileText },
              { id: 'vocab', label: '字彙表', icon: BookOpen },
              { id: 'cloze', label: '聽力填空', icon: Headphones },
              { id: 'shadowing', label: '影子練習', icon: Mic },
              { id: 'quiz', label: '小測驗', icon: CheckSquare },
              { id: 'stats', label: '統計', icon: BarChart2 },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition whitespace-nowrap ${
                  activeTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'guide' && (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">{data.meta.title}</h2>
                <p className="text-lg leading-relaxed text-gray-700">{data.guide}</p>
                <button onClick={exportMarkdown} className="mt-8 border border-gray-300 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-50">
                  匯出為 Markdown
                </button>
              </div>
            )}

            {activeTab === 'vocab' && (
              <div className="grid gap-6">
                {data.vocabulary.map((item, idx) => (
                  <div key={idx} className="border p-4 rounded-lg bg-gray-50 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-blue-800">{item.word}</h3>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {Math.floor(item.timestamp / 60)}:{(item.timestamp % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{item.definition}</p>
                    <div className="bg-white p-3 rounded border-l-4 border-blue-500 italic text-gray-700 mb-2">
                      "{item.example}"
                    </div>
                    <p className="text-sm text-amber-700 flex items-center gap-1">
                      💡 {item.importance}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'cloze' && (
              <div className="space-y-8">
                {data.clozeTest.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-lg mb-4 leading-loose">
                      {item.question.split('______').map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <input type="text" className="border-b-2 border-blue-400 w-32 mx-1 text-center bg-transparent focus:outline-none" placeholder="?" />
                          )}
                        </span>
                      ))}
                    </p>
                    <button className="text-sm text-blue-600 hover:underline">
                      顯示答案: {item.answer}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Other tabs would be implemented similarly */}
            {(activeTab === 'shadowing' || activeTab === 'quiz' || activeTab === 'stats') && (
              <div className="text-center text-gray-500 py-10">
                （此功能在完整版中實作：{activeTab}）
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

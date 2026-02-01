import { useState } from 'react'
import { Youtube, BookOpen, Headphones, Mic, CheckSquare, BarChart2, FileText, Download } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
// Simplified select and tabs for this demo version to keep file count low, 
// in full version we would import them from components/ui
import { cn } from './lib/utils'

// Mock Data Types
type VocabItem = { word: string; definition: string; example: string; timestamp: number; importance: string }
type ClozeItem = { question: string; answer: string; options: string[]; timestamp: number }
type LearningPack = {
  meta: { title: string; guide: string }
  vocabulary: VocabItem[]
  clozeTest: ClozeItem[]
}

// Main App Component
function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<LearningPack | null>(null)
  const [activeTab, setActiveTab] = useState('guide')

  const handleGenerate = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setData({
        meta: {
          title: "How to Negotiate Like a Pro",
          guide: "本影片深入淺出地講解了哈佛談判術的核心概念..."
        },
        vocabulary: [
          { word: "Leverage", definition: "籌碼", example: "Find your leverage.", timestamp: 45, importance: "Critical for Lawyers" },
          { word: "Concession", definition: "讓步", example: "Make a concession.", timestamp: 120, importance: "High frequency" }
        ],
        clozeTest: [
          { question: "The key is finding ______ ground.", answer: "common", options: ["common", "high"], timestamp: 200 }
        ]
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center justify-center gap-3">
            <Youtube className="text-red-600 h-10 w-10" />
            YouTube Learning Gen <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">v2.0</span>
          </h1>
          <p className="text-slate-500">AI-powered professional English learning tool</p>
        </header>

        {/* Input Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 grid gap-6 md:grid-cols-[1fr_200px] items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              YouTube URL
            </label>
            <Input 
              placeholder="https://youtube.com/watch?v=..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button onClick={handleGenerate} disabled={loading || !url} size="lg">
            {loading ? 'Processing...' : 'Generate Pack'}
          </Button>
        </div>

        {/* Results Area */}
        {data && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
            {/* Tabs Header */}
            <div className="flex border-b bg-slate-50/50 p-1 gap-1">
              {[
                { id: 'guide', label: 'Guide', icon: FileText },
                { id: 'vocab', label: 'Vocab', icon: BookOpen },
                { id: 'cloze', label: 'Listening', icon: Headphones },
                { id: 'shadow', label: 'Shadowing', icon: Mic },
                { id: 'quiz', label: 'Quiz', icon: CheckSquare },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all",
                    activeTab === tab.id 
                      ? "bg-white text-slate-950 shadow-sm" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-8 flex-1">
              {activeTab === 'guide' && (
                <div className="space-y-4 max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold">{data.meta.title}</h2>
                  <p className="text-slate-600 leading-relaxed">{data.meta.guide}</p>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> Export Markdown
                  </Button>
                </div>
              )}

              {activeTab === 'vocab' && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.vocabulary.map((vocab, i) => (
                    <div key={i} className="group relative rounded-lg border p-4 hover:shadow-md transition-all bg-slate-50/50 hover:bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-primary">{vocab.word}</h3>
                        <span className="text-xs font-mono bg-slate-200 px-1.5 py-0.5 rounded">{vocab.timestamp}s</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{vocab.definition}</p>
                      <div className="text-sm italic text-slate-500 bg-slate-100 p-2 rounded border-l-2 border-primary/20">
                        "{vocab.example}"
                      </div>
                      <div className="mt-3 text-xs font-medium text-amber-600 flex items-center gap-1">
                        ✨ {vocab.importance}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Other tabs placeholders */}
              {['cloze', 'shadow', 'quiz'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 py-12">
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <Headphones className="h-8 w-8" />
                  </div>
                  <p>Content for {activeTab} will be generated here.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

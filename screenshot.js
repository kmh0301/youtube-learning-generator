const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // 沙箱環境必須加這些參數
    });
    const page = await browser.newPage();
    
    // 設定較大的視窗尺寸以看清楚內容
    await page.setViewport({ width: 1280, height: 1000 });
    
    console.log('Navigating to app...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    // 模擬輸入一些資料以展示結果 (Optional)
    console.log('Simulating interaction...');
    await page.type('input[type="text"]', 'https://www.youtube.com/watch?v=mock');
    await page.click('button'); // 點擊生成按鈕
    
    // 等待 Mock Data 載入 (模擬延遲 1.5s)
    await new Promise(r => setTimeout(r, 2000));
    
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'preview.png', fullPage: true });
    
    await browser.close();
    console.log('Done!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

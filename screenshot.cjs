const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // 沙箱環境必須加這些參數
    });
    const page = await browser.newPage();
    
    // 設定較大的視窗尺寸以看清楚內容
    await page.setViewport({ width: 1280, height: 1000 });
    
    // 監聽 console logs
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    
    page.on('response', response => {
        if (response.status() >= 400) {
            console.log(`PAGE RESOURCE ERROR: ${response.url()} ${response.status()}`);
        }
    });
    
    console.log('Navigating to app...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    // 模擬輸入一些資料以展示結果 (Optional)
    // 截圖除錯
    await page.screenshot({ path: 'debug.png' });
    
    /* 暫時註解互動邏輯
    console.log('Simulating interaction...');
    // 等待頁面載入
    await page.waitForSelector('input');
    await page.type('input', 'https://www.youtube.com/watch?v=mock');
    await page.click('button'); // 點擊生成按鈕
    
    // 等待 Mock Data 載入 (模擬延遲 1.5s)
    await new Promise(r => setTimeout(r, 2000));
    */
    
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'preview.png', fullPage: true });
    
    await browser.close();
    console.log('Done!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

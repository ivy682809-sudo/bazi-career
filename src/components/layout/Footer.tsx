export default function Footer() {
  return (
    <footer className="border-t border-stone-200 py-8 mt-16">
      <div className="max-w-2xl mx-auto px-4 text-center text-sm text-stone-400">
        <p>
          所有计算在浏览器本地执行，不上传任何数据。
        </p>
        <p className="mt-1">
          <a href="/privacy" className="hover:text-stone-600 transition-colors">
            隐私政策
          </a>
        </p>
      </div>
    </footer>
  );
}

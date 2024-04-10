var head = document.querySelector('head')
function addScript(url) {
  let script = document.createElement('script');
  script.src = url;
  return script;
}
var scripts = [
	"/hf_web/icons/aliinter/iconfont.js",
	"/hf_web/icons/alicause/iconfont.js",
	"/hf_web/icons/ant-design/iconfont.js",
	"/hf_web/icons/rookie/iconfont.js",
	"/hf_web/icons/blockchain/iconfont.js",
	"/hf_web/icons/zhifubao/iconfont.js",
	"/hf_web/icons/crov-icon/iconfont.js",
	"/hf_web/icons/huafon/iconfont.js",
	"/hf_web/icons/huafon-crm/iconfont.js"
]
scripts.forEach(url => {
  head.appendChild(addScript(url))
})
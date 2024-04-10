// 引入飞书依赖文件
var feishuScript = document.createElement('script');
feishuScript.type = 'text/javascript';
feishuScript.src = '/hf_web/lib/feishu_h5-js-sdk-1.5.19.js';
var body = document.getElementsByTagName('body')[0];
body.appendChild(feishuScript);

function feishuApiAuth(appId, jsApiList = []) {
  return scriptLoaded().then(() => {
    if (!window.h5sdk) {
      return Promise.reject({ msg: '请确保在飞书环境下使用！' });
    }
    return new Promise((resolve, reject) => {
      window
        .axios({
          url: 'http://gateway.huafeng.com/feishu/app/jsapi/sign-form',
          method: 'post',
          data: stringify({
            appId: appId,
            url: encodeURIComponent(
              encodeURI(window.location.href.split('#')[0])
            )
          })
        })
        .then(data => {
          const res = data.data;
          if (!res.success) {
            reject(data.data);
          }
          // JSAPI 鉴权
          window.h5sdk.config({
            appId: res.data.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.noncestr,
            signature: res.data.signature,
            jsApiList: jsApiList,
            onSuccess: () => {},
            onFail: err => {
              reject(err);
            }
          });
          // window.h5sdk.ready 回调函数在环境准备就绪时触发
          window.h5sdk.ready(() => {
            resolve();
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}

function scriptLoaded() {
  return new Promise(resolve => {
    // ie
    if (feishuScript.readyState) {
      feishuScript.onreadystatechange = () => {
        if (
          feishuScript.readyState === 'complete' ||
          feishuScript.readyState === 'loaded'
        ) {
          resolve();
        }
      };
    } else {
      feishuScript.onload = resolve();
    }
  });
}

function stringify(obj) {
  const values = Object.keys(obj).reduce((total, item, index) => {
    const value = `${item}=${obj[item]}`;
    total += index === 0 ? value : '&' + value;
    return total;
  }, '');
  return values;
}

window.feishuApiAuth = feishuApiAuth;

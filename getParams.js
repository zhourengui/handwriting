function getParams(url) {
  const res = {};
  const reg1 = /(?:http:\/\/|https:\/\/)?(?:[^#?]+)(\?[^#]+)?(#.+)?/g;
  const reg2 = /([^=&]+)=([^=&]+)/g;
  try {
    const [_, params, hash] = reg1.exec(url);
    if (hash) {
      res["HASH"] = hash;
    }
    while (true) {
      const reg2Ret = reg2.exec(params.substring(1));
      const [_, key, value] = reg2Ret;
      res[key] = value;
    }
  } catch {}

  return function (name) {
    return res[name];
  };
}

// getParams("https://baidu.com?name=tencent&age=30#hash"); // { HASH: '#hash', name: 'tencent', age: '30' }
// getParams("https://baidu.com?name=tencent&age=30"); // { name: 'tencent', age: '30' }
// getParams("https://baidu.com"); // {}
// getParams("https://baidu.com#hash"); // { HASH: '#hash' }

const func = getParams("https://baidu.com?name=tencent&age=30#hash");
func("HASH"); // #hash
func("name"); // tencent
func("age"); // 30

/**
 * <img src="" data-img="https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF" lazy style="margin-top: 2000px;height: 400px; background-color: red;width: 200px;">
 */

const imgs = Array.from(document.getElementsByTagName("img")).filter((img) =>
  img.hasAttribute("lazy")
);
function lazyload() {
  const wScrollY = window.scrollY;
  const wOuterHeight = window.outerHeight;
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i];
    const isLoad = img.hasAttribute("isLoad");
    const iOffsetTop = img.offsetTop;
    const iOffsetHeight = img.offsetHeight;
    if (!isLoad && iOffsetHeight + iOffsetTop - wScrollY < wOuterHeight) {
      img.setAttribute("isLoad", "TRUE");
      img.setAttribute("src", img.getAttribute("data-img"));
    }
  }
}
window.addEventListener("load", lazyload);
window.addEventListener("scroll", lazyload);

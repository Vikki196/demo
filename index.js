// 获取背景图片元素
const bgImage = document.querySelector('.bg-image');

// 监听滚动事件
window.addEventListener('scroll', function () {
    // 获取当前滚动位置
    const scrollPosition = window.scrollY;

    // 获取视口高度
    const viewportHeight = window.innerHeight;

    // 计算英雄区域的总高度
    const heroHeight = document.querySelector('.hero-section').offsetHeight;

    // 计算英雄区域的底部位置
    const heroBottom = heroHeight;

    // 如果滚动位置在英雄区域内
    if (scrollPosition <= heroBottom) {
        // 计算在英雄区域内的滚动进度 (0-1)
        const heroScrollProgress = Math.min(scrollPosition / heroHeight, 1);

        // 根据滚动进度计算缩放比例
        // 向下滚动时，图片从200%缩小到100%，实现由近及远看到更全视野的效果
        // 向上滚动时，图片从100%放大到200%，实现由远及近效果
        const scale = 2 - (heroScrollProgress * 1);

        // 应用缩放效果
        bgImage.style.backgroundSize = `${scale * 100}% ${scale * 100}%`;

        // 调整背景位置，使图片随滚动逐渐展现完整内容
        // 初始位置偏上，随着滚动逐渐居中，增强后退看到更全画面的感觉
        const translateY = 30 + (heroScrollProgress * 10);
        bgImage.style.backgroundPosition = `center ${translateY}%`;

        // 保持完全可见
        bgImage.style.opacity = 1;
    } else if (scrollPosition > heroBottom && scrollPosition <= heroBottom + 200) {
        // 在英雄区域底部附近，平滑淡出背景图
        const fadeProgress = Math.min((scrollPosition - heroBottom) / 200, 1);
        bgImage.style.opacity = 1 - fadeProgress;
    } else {
        // 完全滚动到内容区域，隐藏背景图
        bgImage.style.opacity = 0;
    }
});

// 初始触发一次，确保页面加载时效果正确
window.dispatchEvent(new Event('scroll'));
/**
 * Loading Manager - Quản lý trang loading cho toàn bộ website
 * Tách riêng để dễ bảo trì và tái sử dụng
 */

// Cấu hình loading cho từng loại trang
const LOADING_CONFIG = {
    // Trang có maps cần thời gian load
    WITH_MAPS: {
        pages: ['about.html'],
        condition: 'hasMaps'
    },
    // Trang thông thường
    NORMAL: {
        pages: ['products.html', 'contact.html', 'login.html', 'booking.html', 'terms.html', 'tours.html'],
        condition: 'directAccess'
    }
};

/**
 * Kiểm tra xem trang hiện tại có maps không
 * @returns {boolean}
 */
function hasMaps() {
    const maps = document.querySelector('iframe[src*="google.com/maps"]');
    return !!maps;
}

/**
 * Kiểm tra xem có phải truy cập trực tiếp không
 * @returns {boolean}
 */
function isDirectAccess() {
    return !document.referrer || 
           (!document.referrer.includes('index.html') && 
            !document.referrer.includes('loading.html'));
}

/**
 * Kiểm tra xem có đang từ trang loading không (tránh vòng lặp)
 * @returns {boolean}
 */
function isComingFromLoading() {
    return document.referrer && document.referrer.includes('loading.html');
}

/**
 * Lưu trang hiện tại để chuyển hướng sau loading
 */
function storeCurrentPageForRedirect() {
    sessionStorage.setItem('redirectAfterLoading', window.location.pathname);
}

/**
 * Chuyển đến trang loading
 */
function redirectToLoading() {
    window.location.href = 'loading.html';
}

/**
 * Xử lý loading cho trang có maps
 * @returns {boolean} true nếu đã chuyển hướng, false nếu không
 */
function handleLoadingForMapsPage() {
    // Tránh vòng lặp vô hạn
    if (isComingFromLoading()) {
        return false;
    }
    
    // Chỉ hiện loading khi có maps VÀ là direct access
    if (isDirectAccess() && hasMaps()) {
        storeCurrentPageForRedirect();
        redirectToLoading();
        return true;
    }
    
    return false;
}

/**
 * Xử lý loading cho trang thông thường
 * @returns {boolean} true nếu đã chuyển hướng, false nếu không
 */
function handleLoadingForNormalPage() {
    // Tránh vòng lặp vô hạn
    if (isComingFromLoading()) {
        return false;
    }
    
    // Hiện loading khi là direct access
    if (isDirectAccess()) {
        storeCurrentPageForRedirect();
        redirectToLoading();
        return true;
    }
    
    return false;
}

/**
 * Thiết lập event listener cho maps khi không cần loading
 */
function setupMapsEventListener() {
    window.addEventListener('load', function() {
        const maps = document.querySelector('iframe[src*="google.com/maps"]');
        if (maps) {
            maps.addEventListener('load', function() {
                console.log('Maps loaded successfully');
            });
        }
    });
}

/**
 * Khởi tạo loading manager dựa trên loại trang
 * @param {string} pageType - Loại trang: 'maps' hoặc 'normal'
 */
function initLoadingManager(pageType = 'normal') {
    let shouldRedirect = false;
    
    switch (pageType) {
        case 'maps':
            shouldRedirect = handleLoadingForMapsPage();
            break;
        case 'normal':
        default:
            shouldRedirect = handleLoadingForNormalPage();
            break;
    }
    
    // Nếu không chuyển hướng, thiết lập event listener cho maps
    if (!shouldRedirect && hasMaps()) {
        setupMapsEventListener();
    }
}

/**
 * Lấy tên trang hiện tại từ URL
 * @returns {string}
 */
function getCurrentPageName() {
    const pathname = window.location.pathname;
    const pageName = pathname.split('/').pop();
    return pageName;
}

/**
 * Tự động xác định loại trang và khởi tạo loading manager
 */
function autoInitLoadingManager() {
    const currentPage = getCurrentPageName();
    
    // Kiểm tra trang có maps
    if (LOADING_CONFIG.WITH_MAPS.pages.includes(currentPage)) {
        initLoadingManager('maps');
    }
    // Kiểm tra trang thông thường
    else if (LOADING_CONFIG.NORMAL.pages.includes(currentPage)) {
        initLoadingManager('normal');
    }
    // Trang khác không cần loading
    else {
        console.log('No loading needed for this page');
    }
}

// Tự động khởi tạo khi DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitLoadingManager);
} else {
    autoInitLoadingManager();
}

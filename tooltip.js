// IIFE để có thể chạy trong console
        (function() {
            // Kiểm tra nếu đã inject rồi thì không inject lại
            if (document.getElementById('overlay-styles')) {
                console.log('Styles already injected, reinitializing overlays...');
                initOverlays();
                return;
            }

            // Tạo và thêm CSS vào document
            function injectStyles() {
                const style = document.createElement('style');
                style.id = 'overlay-styles'; // Thêm ID để kiểm tra
                style.textContent = `
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        padding: 40px;
                        background: #f5f5f5;
                    }

                    .image-container {
                        position: relative;
                        display: inline-block;
                        cursor: pointer;
                        margin: 20px;
                    }

                    .image-container img {
                        display: block;
                        max-width: 400px;
                        border-radius: 8px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        transition: transform 0.3s ease;
                    }

                    .image-container:hover img {
                        transform: scale(1.02);
                    }

                    .overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(135deg, rgba(30, 30, 60, 0.95), rgba(50, 50, 80, 0.95));
                        border-radius: 8px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s ease;
                        color: white;
                        padding: 20px;
                    }

                    .overlay.show {
                        opacity: 1;
                        visibility: visible;
                    }

                    .overlay-title {
                        font-size: 18px;
                        font-weight: 600;
                        margin-bottom: 20px;
                        text-align: center;
                    }

                    .overlay-menu {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        width: 100%;
                        max-width: 220px;
                    }

                    .overlay-btn {
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 12px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        transition: all 0.2s ease;
                        font-size: 14px;
                    }

                    .overlay-btn:hover {
                        background: rgba(255, 255, 255, 0.2);
                        transform: translateX(5px);
                    }

                    .overlay-btn svg {
                        width: 18px;
                        height: 18px;
                    }

                    .demo-section {
                        text-align: center;
                    }

                    .demo-section h2 {
                        color: #333;
                        margin-bottom: 20px;
                    }
                `;
                document.head.appendChild(style);
            }

            // Tạo overlay cho mỗi ảnh
            function createOverlay() {
                const overlay = document.createElement('div');
                overlay.className = 'overlay';
                overlay.innerHTML = `
                    <div class="overlay-title">🎨 AI Tools</div>
                    <div class="overlay-menu">
                        <button class="overlay-btn" data-action="chat">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </svg>
                            Chat with Image
                        </button>
                        <button class="overlay-btn" data-action="extract">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Extract Text
                        </button>
                        <button class="overlay-btn" data-action="tools">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                            </svg>
                            Image Tools
                        </button>
                        <button class="overlay-btn" data-action="save">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                            </svg>
                            Save to Wisebase
                        </button>
                    </div>
                `;
                return overlay;
            }

            // Khởi tạo overlay cho tất cả ảnh
            function initOverlays() {
                // Xóa overlay cũ nếu có
                document.querySelectorAll('.overlay').forEach(el => el.remove());
                
                document.querySelectorAll('.product-5__frame').forEach(container => {
                    const overlay = createOverlay();
                    container.appendChild(overlay);

                    // Xử lý hover
                    container.addEventListener('mouseenter', () => {
                        overlay.classList.add('show');
                    });

                    container.addEventListener('mouseleave', () => {
                        overlay.classList.remove('show');
                    });

                    // Xử lý click các nút
                    overlay.querySelectorAll('.overlay-btn').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const action = btn.dataset.action;
                            const imageId = container.dataset.imageId;
                            console.log(`Action: ${action} on image ${imageId}`);
                            alert(`Bạn đã chọn: ${btn.textContent.trim()}`);
                        });
                    });
                });
                
                console.log('✅ Image overlay initialized successfully!');
            }

            // Chạy ngay lập tức
            injectStyles();
            initOverlays();
        })();
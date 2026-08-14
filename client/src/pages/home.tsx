<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>LAST DIGIT PRO · Premium</title>
    <!-- Google Fonts: Inter for modern, clean typography -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap" rel="stylesheet" />
    <style>
        /* ===== RESET & BASE ===== */
        *,
        *::before,
        *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: #0e0d12;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            padding: 20px;
            margin: 0;
        }

        /* ===== PHONE FRAME ===== */
        .phone-frame {
            width: 390px;
            max-width: 100%;
            background: #131218;
            border-radius: 48px;
            padding: 18px 16px 10px;
            box-shadow:
                0 30px 80px rgba(0, 0, 0, 0.8),
                0 0 0 1px rgba(255, 255, 255, 0.04) inset,
                0 0 0 1px rgba(255, 255, 255, 0.02);
            position: relative;
            transition: all 0.2s ease;
        }

        /* subtle inner glow */
        .phone-frame::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 48px;
            padding: 1px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, transparent 60%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
        }

        /* ===== STATUS BAR (simulated) ===== */
        .status-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 4px 14px 4px;
            color: rgba(255, 255, 255, 0.45);
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.2px;
        }
        .status-bar .time {
            font-weight: 600;
            color: rgba(255, 255, 255, 0.7);
        }
        .status-icons {
            display: flex;
            gap: 6px;
            align-items: center;
        }
        .status-icons svg {
            opacity: 0.65;
        }

        /* ===== HEADER ===== */
        .app-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2px 0 14px 0;
        }
        .brand {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .brand-icon {
            width: 36px;
            height: 36px;
            background: linear-gradient(145deg, #f5b042, #e8922e);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 16px;
            color: #131218;
            box-shadow: 0 4px 12px rgba(232, 146, 46, 0.3);
        }
        .brand-text {
            font-weight: 700;
            font-size: 20px;
            letter-spacing: -0.3px;
            color: #ffffff;
            background: linear-gradient(135deg, #ffffff 60%, rgba(255, 255, 255, 0.7));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .brand-text span {
            font-weight: 300;
            color: rgba(255, 255, 255, 0.35);
            -webkit-text-fill-color: rgba(255, 255, 255, 0.35);
        }

        .header-actions {
            display: flex;
            gap: 6px;
            align-items: center;
        }
        .header-btn {
            width: 38px;
            height: 38px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.06);
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.6);
            cursor: default;
            transition: all 0.2s;
            backdrop-filter: blur(4px);
        }
        .header-btn svg {
            opacity: 0.8;
        }

        /* ===== LIVE USER STRIP ===== */
        .live-strip {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 16px;
            padding: 10px 14px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            margin-bottom: 16px;
            backdrop-filter: blur(4px);
        }
        .live-strip-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .live-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #34d399;
            box-shadow: 0 0 12px rgba(52, 211, 153, 0.4);
            animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
            0%,
            100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.5;
                transform: scale(0.85);
            }
        }
        .live-label {
            font-size: 13px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.8);
            letter-spacing: 0.2px;
        }
        .live-label strong {
            font-weight: 600;
            color: #ffffff;
        }
        .live-count {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.35);
            background: rgba(255, 255, 255, 0.05);
            padding: 4px 12px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .live-count .num {
            color: #ffffff;
            font-weight: 600;
        }

        /* ===== SECURE / LIVE UPDATES STRIP ===== */
        .info-strip {
            display: flex;
            align-items: center;
            gap: 14px;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 14px;
            padding: 10px 16px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        .info-badge {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.6);
        }
        .info-badge svg {
            opacity: 0.6;
        }
        .info-badge .highlight {
            color: #f5b042;
            font-weight: 600;
        }
        .info-divider {
            width: 1px;
            height: 20px;
            background: rgba(255, 255, 255, 0.08);
        }
        .info-update {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
            font-weight: 500;
        }
        .info-update .live-badge {
            background: rgba(52, 211, 153, 0.12);
            color: #34d399;
            padding: 2px 10px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.3px;
            text-transform: uppercase;
            border: 1px solid rgba(52, 211, 153, 0.15);
        }

        /* ===== FEATURE GRID ===== */
        .feature-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 20px;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.02);
            border-radius: 20px;
            padding: 18px 16px 16px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(4px);
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
            min-height: 110px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .feature-card::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 80px;
            height: 80px;
            background: radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.02), transparent 70%);
            pointer-events: none;
            border-radius: 0 20px 0 80px;
        }
        .feature-card .card-icon {
            width: 40px;
            height: 40px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .feature-card .card-icon svg {
            opacity: 0.85;
        }
        .feature-card .card-title {
            font-size: 15px;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: -0.2px;
            margin-bottom: 4px;
        }
        .feature-card .card-desc {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.35);
            font-weight: 400;
            line-height: 1.4;
        }
        .feature-card .card-eta {
            font-size: 10px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.2);
            margin-top: 8px;
            letter-spacing: 0.3px;
            text-transform: uppercase;
        }

        /* special card: Lucky Search */
        .feature-card.lucky {
            background: linear-gradient(145deg, rgba(245, 176, 66, 0.08), rgba(232, 146, 46, 0.02));
            border-color: rgba(245, 176, 66, 0.12);
        }
        .feature-card.lucky .card-icon {
            background: rgba(245, 176, 66, 0.12);
            border-color: rgba(245, 176, 66, 0.15);
        }
        .feature-card.lucky .card-title {
            color: #f5b042;
        }

        /* special card: Dear Digits */
        .feature-card.digits {
            background: linear-gradient(145deg, rgba(99, 102, 241, 0.06), rgba(99, 102, 241, 0.01));
            border-color: rgba(99, 102, 241, 0.08);
        }
        .feature-card.digits .card-icon {
            background: rgba(99, 102, 241, 0.10);
            border-color: rgba(99, 102, 241, 0.12);
        }
        .feature-card.digits .card-title {
            color: #a5b4fc;
        }

        /* ===== FULL-WIDTH FEATURE: Lottery Fax ===== */
        .lottery-fax {
            background: rgba(255, 255, 255, 0.02);
            border-radius: 20px;
            padding: 18px 18px 16px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            margin-bottom: 16px;
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
        }
        .lottery-fax::after {
            content: '';
            position: absolute;
            top: -20px;
            right: -20px;
            width: 120px;
            height: 120px;
            background: radial-gradient(circle, rgba(245, 176, 66, 0.04), transparent 70%);
            border-radius: 50%;
            pointer-events: none;
        }
        .lottery-fax-left {
            display: flex;
            align-items: center;
            gap: 14px;
            z-index: 1;
        }
        .lottery-fax-left .fax-icon {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.04);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .lottery-fax-left .fax-text .fax-title {
            font-size: 16px;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: -0.2px;
        }
        .lottery-fax-left .fax-text .fax-desc {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.35);
            margin-top: 2px;
        }
        .lottery-fax .fax-badge {
            background: rgba(245, 176, 66, 0.10);
            border: 1px solid rgba(245, 176, 66, 0.12);
            padding: 6px 14px;
            border-radius: 30px;
            font-size: 11px;
            font-weight: 600;
            color: #f5b042;
            letter-spacing: 0.2px;
            z-index: 1;
            white-space: nowrap;
        }

        /* ===== SETTINGS PREVIEW (mini) ===== */
        .settings-preview {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 20px;
            padding: 14px 18px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            margin-bottom: 16px;
            backdrop-filter: blur(4px);
            cursor: default;
        }
        .settings-preview-left {
            display: flex;
            align-items: center;
            gap: 14px;
        }
        .settings-preview-left .set-icon {
            width: 40px;
            height: 40px;
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.04);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .settings-preview-left .set-text .set-title {
            font-size: 15px;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: -0.2px;
        }
        .settings-preview-left .set-text .set-desc {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.3);
        }
        .settings-preview .set-arrow {
            color: rgba(255, 255, 255, 0.15);
        }

        /* ===== 100% REFUND GUARANTEE ===== */
        .refund-section {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.005));
            border-radius: 20px;
            padding: 16px 18px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 14px;
            backdrop-filter: blur(4px);
            position: relative;
            overflow: hidden;
        }
        .refund-section::before {
            content: '';
            position: absolute;
            top: -40px;
            right: -40px;
            width: 160px;
            height: 160px;
            background: radial-gradient(circle, rgba(52, 211, 153, 0.04), transparent 70%);
            border-radius: 50%;
            pointer-events: none;
        }
        .refund-icon {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            background: rgba(52, 211, 153, 0.06);
            border: 1px solid rgba(52, 211, 153, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            z-index: 1;
        }
        .refund-text {
            z-index: 1;
        }
        .refund-text .refund-title {
            font-size: 15px;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: -0.2px;
        }
        .refund-text .refund-desc {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.3);
            margin-top: 2px;
        }
        .refund-badge {
            margin-left: auto;
            background: rgba(52, 211, 153, 0.08);
            border: 1px solid rgba(52, 211, 153, 0.08);
            padding: 4px 14px;
            border-radius: 30px;
            font-size: 11px;
            font-weight: 600;
            color: #34d399;
            letter-spacing: 0.3px;
            z-index: 1;
            white-space: nowrap;
        }

        /* ===== BOTTOM NAVIGATION ===== */
        .bottom-nav {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 8px 4px 6px;
            margin-top: 4px;
            border-top: 1px solid rgba(255, 255, 255, 0.03);
            position: relative;
        }
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            cursor: default;
            padding: 4px 16px;
            border-radius: 16px;
            transition: all 0.2s;
            position: relative;
        }
        .nav-item .nav-icon {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.25);
            transition: all 0.3s;
        }
        .nav-item .nav-label {
            font-size: 10px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.2);
            letter-spacing: 0.2px;
            transition: all 0.3s;
        }
        .nav-item.active .nav-icon {
            color: #f5b042;
        }
        .nav-item.active .nav-label {
            color: #f5b042;
            font-weight: 600;
        }
        .nav-item.active::before {
            content: '';
            position: absolute;
            top: -1px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 2.5px;
            border-radius: 4px;
            background: #f5b042;
            box-shadow: 0 0 16px rgba(245, 176, 66, 0.3);
        }
        .nav-item:not(.active):hover .nav-icon {
            color: rgba(255, 255, 255, 0.45);
        }
        .nav-item:not(.active):hover .nav-label {
            color: rgba(255, 255, 255, 0.35);
        }

        /* ===== SPACING HELPERS ===== */
        .spacer-4 {
            height: 4px;
        }
        .spacer-8 {
            height: 8px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 420px) {
            .phone-frame {
                border-radius: 28px;
                padding: 14px 12px 8px;
            }
            .feature-grid {
                gap: 10px;
            }
            .feature-card {
                padding: 14px 12px 12px;
                min-height: 96px;
            }
            .brand-text {
                font-size: 17px;
            }
            .live-strip {
                padding: 8px 12px;
            }
            .info-strip {
                padding: 8px 12px;
                gap: 10px;
            }
            .lottery-fax {
                padding: 14px 14px 12px;
            }
            .settings-preview {
                padding: 12px 14px;
            }
            .refund-section {
                padding: 14px 14px;
            }
            .nav-item {
                padding: 4px 10px;
            }
        }

        @media (max-width: 360px) {
            .phone-frame {
                border-radius: 20px;
                padding: 10px 8px 6px;
            }
            .feature-grid {
                gap: 8px;
            }
            .feature-card {
                padding: 10px 10px 10px;
                min-height: 

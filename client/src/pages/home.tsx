<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>LAST DIGIT PRO · Premium</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap" rel="stylesheet" />
    <style>
        /* ============================================
                   RESET & BASE
                   ============================================ */
        *,
        *::before,
        *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: #0b0a0f;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            padding: 20px;
            margin: 0;
        }

        /* ============================================
                   PHONE FRAME
                   ============================================ */
        .phone-frame {
            width: 390px;
            max-width: 100%;
            background: #121016;
            border-radius: 48px;
            padding: 18px 16px 8px;
            position: relative;
            box-shadow:
                0 40px 90px rgba(0, 0, 0, 0.85),
                0 0 0 1px rgba(255, 255, 255, 0.04) inset,
                0 0 0 1px rgba(255, 255, 255, 0.02);
            transition: all 0.2s ease;
            overflow: hidden;
        }

        /* subtle edge glow */
        .phone-frame::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 48px;
            padding: 1px;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%, rgba(255, 255, 255, 0.02) 100%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
        }

        /* ============================================
                   STATUS BAR (simulated)
                   ============================================ */
        .status-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2px 2px 14px 2px;
            color: rgba(255, 255, 255, 0.35);
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
            opacity: 0.5;
        }

        /* ============================================
                   HEADER — LAST DIGIT PRO
                   ============================================ */
        .app-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0 16px 0;
        }
        .brand {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .brand-icon {
            width: 38px;
            height: 38px;
            background: linear-gradient(145deg, #f5b042, #d97d2a);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 17px;
            color: #121016;
            box-shadow: 0 4px 16px rgba(218, 145, 47, 0.25);
            flex-shrink: 0;
        }
        .brand-text {
            font-weight: 800;
            font-size: 20px;
            letter-spacing: -0.4px;
            color: #ffffff;
            background: linear-gradient(135deg, #ffffff 55%, rgba(255, 255, 255, 0.6));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .brand-text span {
            font-weight: 300;
            color: rgba(255, 255, 255, 0.25);
            -webkit-text-fill-color: rgba(255, 255, 255, 0.25);
        }

        .header-actions {
            display: flex;
            gap: 6px;
            align-items: center;
        }
        .header-btn {
            width: 38px;
            height: 38px;
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.4);
            cursor: default;
            transition: all 0.2s;
            backdrop-filter: blur(6px);
        }
        .header-btn svg {
            opacity: 0.7;
        }

        /* ============================================
                   LIVE USER INDICATOR
                   ============================================ */
        .live-strip {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 18px;
            padding: 10px 16px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            margin-bottom: 14px;
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
            box-shadow: 0 0 16px rgba(52, 211, 153, 0.3);
            animation: pulse-dot 2.4s ease-in-out infinite;
            flex-shrink: 0;
        }
        @keyframes pulse-dot {
            0%,
            100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.4;
                transform: scale(0.8);
            }
        }
        .live-label {
            font-size: 13px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.75);
            letter-spacing: 0.1px;
        }
        .live-label strong {
            font-weight: 700;
            color: #ffffff;
        }
        .live-count {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.04);
            padding: 4px 14px;
            border-radius: 30px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;
            letter-spacing: 0.2px;
        }
        .live-count .num {
            color: #ffffff;
            font-weight: 600;
        }

        /* ============================================
                   SECURE / LIVE UPDATES STRIP
                   ============================================ */
        .info-strip {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255, 255, 255, 0.015);
            border-radius: 16px;
            padding: 9px 16px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        .info-badge {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 11px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.5);
            letter-spacing: 0.2px;
        }
        .info-badge svg {
            opacity: 0.5;
            flex-shrink: 0;
        }
        .info-badge .highlight {
            color: #f5b042;
            font-weight: 600;
        }
        .info-divider {
            width: 1px;
            height: 18px;
            background: rgba(255, 255, 255, 0.06);
        }
        .info-update {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 11px;
            color: rgba(255, 255, 255, 0.4);
            font-weight: 500;
            letter-spacing: 0.1px;
        }
        .info-update .live-badge {
            background: rgba(52, 211, 153, 0.08);
            color: #34d399;
            padding: 2px 12px;
            border-radius: 30px;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            border: 1px solid rgba(52, 211, 153, 0.08);
        }

        /* ============================================
                   FEATURE GRID — Lucky Search, Dear Digits
                   ============================================ */
        .feature-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 14px;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.015);
            border-radius: 22px;
            padding: 18px 16px 14px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(4px);
            transition: all 0.25s ease;
            position: relative;
            overflow: hidden;
            min-height: 108px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            cursor: default;
        }
        .feature-card::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 70px;
            height: 70px;
            background: radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.015), transparent 70%);
            pointer-events: none;
            border-radius: 0 22px 0 70px;
        }

        .feature-card .card-icon {
            width: 42px;
            height: 42px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .feature-card .card-icon svg {
            opacity: 0.85;
        }
        .feature-card .card-title {
            font-size: 15px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.2px;
            margin-bottom: 2px;
        }
        .feature-card .card-desc {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.3);
            font-weight: 400;
            line-height: 1.4;
        }
        .feature-card .card-tag {
            font-size: 9px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.15);
            margin-top: 8px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        /* Lucky Search — warm gold accent */
        .feature-card.lucky {
            background: linear-gradient(145deg, rgba(245, 176, 66, 0.06), rgba(245, 176, 66, 0.01));
            border-color: rgba(245, 176, 66, 0.08);
        }
        .feature-card.lucky .card-icon {
            background: rgba(245, 176, 66, 0.08);
            border-color: rgba(245, 176, 66, 0.10);
        }
        .feature-card.lucky .card-title {
            color: #f5b042;
        }

        /* Dear Digits — cool violet accent */
        .feature-card.digits {
            background: linear-gradient(145deg, rgba(129, 140, 248, 0.05), rgba(129, 140, 248, 0.01));
            border-color: rgba(129, 140, 248, 0.06);
        }
        .feature-card.digits .card-icon {
            background: rgba(129, 140, 248, 0.07);
            border-color: rgba(129, 140, 248, 0.08);
        }
        .feature-card.digits .card-title {
            color: #a5b4fc;
        }

        /* ============================================
                   LOTTERY FAX — full-width
                   ============================================ */
        .lottery-fax {
            background: rgba(255, 255, 255, 0.015);
            border-radius: 22px;
            padding: 16px 18px 14px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            margin-bottom: 14px;
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
            cursor: default;
        }
        .lottery-fax::after {
            content: '';
            position: absolute;
            top: -30px;
            right: -30px;
            width: 140px;
            height: 140px;
            background: radial-gradient(circle, rgba(245, 176, 66, 0.03), transparent 70%);
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
            width: 46px;
            height: 46px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.04);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .lottery-fax-left .fax-text .fax-title {
            font-size: 16px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.2px;
        }
        .lottery-fax-left .fax-text .fax-desc {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.3);
            margin-top: 1px;
        }
        .lottery-fax .fax-badge {
            background: rgba(245, 176, 66, 0.06);
            border: 1px solid rgba(245, 176, 66, 0.08);
            padding: 4px 16px;
            border-radius: 30px;
            font-size: 10px;
            font-weight: 600;
            color: #f5b042;
            letter-spacing: 0.3px;
            z-index: 1;
            white-space: nowrap;
        }

        /* ============================================
                   SETTINGS — preview card
                   ============================================ */
        .settings-preview {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(255, 255, 255, 0.015);
            border-radius: 22px;
            padding: 14px 18px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            margin-bottom: 14px;
            backdrop-filter: blur(4px);
            cursor: default;
            transition: all 0.2s;
        }
        .settings-preview-left {
            display: flex;
            align-items: center;
            gap: 14px;
        }
        .settings-preview-left .set-icon {
            width: 42px;
            height: 42px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.04);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .settings-preview-left .set-text .set-title {
            font-size: 15px;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: -0.2px;
        }
        .settings-preview-left .set-text .set-desc {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.25);
            margin-top: 1px;
        }
        .settings-preview .set-arrow {
            color: rgba(255, 255, 255, 0.10);
        }

        /* ============================================
                   100% REFUND GUARANTEE
                   ============================================ */
        .refund-section {
            background: rgba(255, 255, 255, 0.015);
            border-radius: 22px;
            padding: 16px 18px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            margin-bottom: 18px;
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
            top: -50px;
            right: -50px;
            width: 180px;
            height: 180px;
            background: radial-gradient(circle, rgba(52, 211, 153, 0.03), transparent 70%);
            border-radius: 50%;
            pointer-events: none;
        }
        .refund-icon {
            width: 44px;
            height: 44px;
            border-radius: 16px;
            background: rgba(52, 211, 153, 0.04);
            border: 1px solid rgba(52, 211, 153, 0.06);
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
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.2px;
        }
        .refund-text .refund-desc {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.3);
            margin-top: 1px;
        }
        .refund-badge {
            margin-left: auto;
            background: rgba(52, 211, 153, 0.04);
            border: 1px solid rgba(52, 211, 153, 0.06);
            padding: 3px 16px;
            border-radius: 30px;
            font-size: 10px;
            font-weight: 600;
            color: #34d399;
            letter-spacing: 0.3px;
            z-index: 1;
            white-space: nowrap;
        }

        /* ============================================
                   BOTTOM NAVIGATION — Home, Support, Settings
                   ============================================ */
        .bottom-nav {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 6px 4px 2px;
            margin-top: 2px;
            border-top: 1px solid rgba(255, 255, 255, 0.03);
            position: relative;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3px;
            cursor: default;
            padding: 4px 18px;
            border-radius: 18px;
            transition: all 0.25s ease;
            position: relative;
            -webkit-tap-highlight-color: transparent;
        }
        .nav-item .nav-icon {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.15);
            transition: all 0.3s ease;
        }
        .nav-item .nav-icon svg {
            transition: transform 0.3s ease;
        }
        .nav-item .nav-label {
            font-size: 9px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.12);
            letter-spacing: 0.4px;
            text-transform: uppercase;
            transition: all 0.3s ease;
        }

        /* Active state — gold accent */
        .nav-item.active .nav-icon {
            color: #f5b042;
        }
        .nav-item.active .nav-icon svg {
            transform: translateY(-1px) scale(1.05);
        }
        .nav-item.active .nav-label {
            color: #f5b042;
            font-weight: 700;
        }
        .nav-item.active::before {
            content: '';
            position: absolute;
            top: -1px;
            left: 50%;
            transform: translateX(-50%);
            width: 24px;
            height: 2.5px;
            border-radius: 4px;
            background: linear-gradient(90deg, #f5b042, #e8922e);
            box-shadow: 0 0 20px rgba(245, 176, 66, 0.25);
        }

        /* Hover states */
        .nav-item:not(.active):hover .nav-icon {
            color: rgba(255, 255, 255, 0.35);
        }
        .nav-item:not(.active):hover .nav-label {
            color: rgba(255, 255, 255, 0.25);
        }

        /* ============================================
                   RESPONSIVE
                   ============================================ */
        @media (max-width: 420px) {
            .phone-frame {
                border-radius: 32px;
                padding: 14px 12px 6px;
            }
            .feature-grid {
                gap: 10px;
            }
            .feature-card {
                padding: 14px 12px 12px;
                min-height: 94px;
                border-radius: 18px;
            }
            .feature-card .card-icon {
                width: 36px;
                height: 36px;
                border-radius: 12px;
            }
            .feature-card .card-title {
                font-size: 13px;
            }
            .brand-text {
                font-size: 17px;
            }
            .brand-icon {
                width: 32px;
                height: 32px;
                font-size: 14px;
                border-radius: 12px;
            }
            .live-strip {
                padding: 8px 12px;
                border-radius: 14px;
            }
            .info-strip {
                padding: 8px 12px;
                gap: 8px;
                border-radius: 14px;
            }
            .lottery-fax {
                padding: 12px 14px;
                border-radius: 18px;
            }
            .settings-preview {
                padding: 12px 14px;
                border-radius: 18px;
            }
            .refund-section {
                padding: 12px 14px;
                border-radius: 18px;
            }
            .nav-item {
                padding: 4px 12px;
            }
            .nav-item .nav-label {
                font-size: 8px;
            }
        }

        @media (max-width: 360px) {
            .phone-frame {
                border-radius: 24px;
                padding: 10px 8px 4px;
            }
            .feature-grid {
                gap: 8px;
            }
            .feature-card {
                padding: 10px 10px 10px;
                min-height: 78px;
                border-radius: 14px;
            }
            .feature-card .card-title {
                font-size: 12px;
            }
            .feature-card .card-desc {
                font-size: 9px;
            }
            .feature-card .card-icon {
                width: 30px;
                height: 30px;
                border-radius: 10px;
            }
            .feature-card .card-icon svg {
                width: 14px;
                height: 14px;
            }
            .brand-text {
                font-size: 14px;
            }
            .brand-icon {
                width: 28px;
                height: 28px;
                font-size: 12px;
                border-radius: 10px;
            }
            .live-label {
                font-size: 11px;
            }
            .live-count {
                font-size: 9px;
                padding: 2px 10px;
            }
            .info-badge {
                font-size: 9px;
            }
            .info-update {
                font-size: 9px;
            }
            .lottery-fax-left .fax-icon {
                width: 36px;
                height: 36px;
                border-radius: 12px;
            }
            .lottery-fax-left .fax-text .fax-title {
                font-size: 13px;
            }
            .lottery-fax-left .fax-text .fax-desc {
                font-size: 9px;
            }
            .settings-preview-left .set-icon {
                width: 34px;
                height: 34px;
                border-radius: 12px;
            }
            .settings-preview-left .set-text .set-title {
                font-size: 13px;
            }
            .settings-preview-left .set-text .set-desc {
                font-size: 9px;
            }
            .refund-icon {
                width: 36px;
                height: 36px;
                border-radius: 12px;
            }
            .refund-text .refund-title {
                font-size: 13px;
            }
            .refund-text .refund-desc {
                font-size: 9px;
            }
            .refund-badge {
                font-size: 8px;
                padding: 2px 10px;
            }
            .nav-item {
                padding: 4px 8px;
            }
            .nav-item .nav-icon {
                width: 22px;
                height: 22px;
            }
            .nav-item .nav-icon svg {
                width: 18px;
                height: 18px;
            }
        }

        /* ============================================
                   SCROLLBAR HIDE
                   ============================================ */
        .phone-frame::-webkit-scrollbar {
            display: none;
        }
        .phone-frame {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        /* ============================================
                   UTILITY — shimmer (very subtle)
                   ============================================ */
        .shimmer-base {
            position: relative;
            overflow: hidden;
        }
        .shimmer-base::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 60%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.015), transparent);
            animation: shimmer-slow 6s ease-in-out infinite;
            pointer-events: none;
        }
        @keyframes shimmer-slow {
            0% {
                left: -100%;
            }
            100% {
                left: 200%;
            }
        }
    </style>
</head>
<body>

    <div class="phone-frame">

        <!-- ==========================================
        STATUS BAR
        ========================================== -->
        <div class="status-bar">
            <span class="time">9:41</span>
            <div class="status-icons">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <rect x="0.5" y="8" width="3" height="4" rx="0.5" fill="currentColor" opacity="0.4"/>
                    <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="currentColor" opacity="0.5"/>
                    <rect x="8.5" y="4" width="3" height="8" rx="0.5" fill="currentColor" opacity="0.7"/>
                    <rect x="12.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" opacity="1"/>
                </svg>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path d="M1 6C1 3.23858 3.23858 1 6 1H10C12.7614 1 15 3.23858 15 6C15 8.76142 12.7614 11 10 11H6C3.23858 11 1 8.76142 1 6Z" stroke="currentColor" stroke-width="1.2" opacity="0.4"/>
                    <path d="M4 6C4 4.34315 5.34315 3 7 3H9C10.6569 3 12 4.34315 12 6C12 7.65685 10.6569 9 9 9H7C5.34315 9 4 7.65685 4 6Z" fill="currentColor" opacity="0.5"/>
                </svg>
            </div>
        </div>

        <!-- ==========================================
        HEADER — LAST DIGIT PRO
        ========================================== -->
        <div class="app-header">
            <div class="brand">
                <div class="brand-icon">✦</div>
                <div class="brand-text">LAST DIGIT <span>PRO</span></div>
            </div>
            <div class="header-actions">
                <div class="header-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.04.04A10 10 0 0 0 12 20a10 10 0 0 0 6.36-4.96l.04-.04z"/>
                        <path d="M12 4v4"/>
                    </svg>
                </div>
            </div>
        </div>

        <!-- ==========================================
        LIVE USER INDICATOR
        ========================================== -->
        <div class="live-strip shimmer-base">
            <div class="live-strip-left">
                <div class="live-dot"></div>
                <div class="live-label"><strong id="activeCount">1,284</strong> active now</div>
            </div>
            <div class="live-count">
                <span>●</span> <span class="num" id="newCount">+12</span> <span>new</span>
            </div>
        </div>

        <!-- ==========================================
        SECURE / LIVE UPDATES STRIP
        ========================================== -->
        <div class="info-strip">
            <div class="info-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Secure <span class="highlight">·</span> Encrypted</span>
            </div>
            <div class="info-divider"></div>
            <div class="info-update">
                <span>⏱</span> <span>Live updates</span>
                <span class="live-badge">● LIVE</span>
            </div>
        </div>

        <!-- ==========================================
        FEATURE GRID — Lucky Search + Dear Digits
        ========================================== -->
        <div class="feature-grid">
            <!-- Lucky Search -->
            <div class="feature-card lucky shimmer-base">
                <div>
                    <div class="card-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5b042" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                            <path d="M11 8v6M8 11h6"/>
                        </svg>
                    </div>
                    <div class="card-title">Lucky Search</div>
                    <div class="card-desc">VIP prediction tool</div>
                </div>
                <div class="card-tag">Instant results</div>
            </div>

            <!-- Dear Digits -->
            <div class="feature-card digits shimmer-base">
                <div>
                    <div class="card-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2v4M12 22v-4M4 12H2M22 12h-2M19.07 4.93l-2.83 2.83M6.9 17.1l-2.83 2.83M17.1 6.9l2.83-2.83M4.93 19.07l2.83-2.83"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </div>
                    <div class="card-title">Dear Digits</div>
                    <div class="card-desc">60-day chart analysis</div>
                </div>
                <div class="card-tag">Daily updates</div>
            </div>
        </div>

        <!-- ==========================================
        LOTTERY FAX
        ========================================== -->
        <div class="lottery-fax shimmer-base">
            <div class="lottery-fax-left">
                <div class="fax-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="4" y="2" width="16" height="20" rx="2"/>
                        <path d="M8 6h8M8 10h6M8 14h8M8 18h6"/>
                    </svg>
                </div>
                <div class="fax-text">
                    <div class="fax-title">Lottery Fax</div>
                    <div class="fax-desc">Official results archive</div>
                </div>
            </div>
            <div class="fax-badge">● New</div>
        </div>

        <!-- ==========================================
        SETTINGS — preview
        ========================================== -->
        <div class="settings-preview shimmer-base">
            <div class="settings-preview-left">
                <div class="set-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    </svg>
                </div>
                <div class="set-text">
                    <div class="set-title">Settings</div>
                    <div class="set-desc">App preferences &amp; account</div>
                </div>
            </div>
            <div class="set-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </div>
        </div>

        <!-- ==========================================
        100% REFUND GUARANTEE
        ========================================== -->
        <div class="refund-section shimmer-base">
            <div class="refund-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                </svg>
            </div>
            <div class="refund-text">
                <div class="refund-title">100% Refund Guarantee</div>
                <div class="refund-desc">Predictions miss, payment refunded.</div>
            </div>
            <div class="refund-badge">Protected</div>
        </div>

        <!-- ==========================================
        BOTTOM NAVIGATION — Home · Support · Settings
        ========================================== -->
        <div class="bottom-nav">
            <!-- Home — active -->
            <div class="nav-item active">
                <div class="nav-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                </div>
                <div class="nav-label">Home</div>
            </div>

            <!-- Support -->
            <div class="nav-item">
                <div class="nav-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                    </svg>
                </div>
                <div class="nav-label">Support</div>
            </div>

            <!-- Settings -->
            <div class="nav-item">
                <div class="nav-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    </svg>
                </div>
                <div class="nav-label">Settings</div>
            </div>
        </div>

    </div>
    <!-- end phone-frame -->

    <!-- ==========================================
    JAVASCRIPT — dynamic live user count
    ========================================== -->
    <script>
        (function() {
            const activeEl = document.getElementById('activeCount');
            const newEl = document.getElementById('newCount');

            let activeUsers = 1284;

            function updateActiveUsers() {
                const now = new Date();
                const hour = now.getHours();
                const minute = now.getMinutes();

                let min = 10,
                    max = 150;

                if (hour === 12 && minute <= 56) {
                    min = 350;
                    max = 500;
                } else if ((hour === 17 && minute >= 30) || (hour >= 18 && hour < 20)) {
                    min = 350;
                    max = 500;
                } else if (hour >= 20 || hour < 12) {
                    min = 10;
                    max = 40;
                } else {
                    min = 50;
                    max = 200;
                }

                const randomUsers = Math.floor(Math.random() * (max - min + 1)) + min;
                // smooth transition: blend toward new value
                const diff = randomUsers - activeUsers;
                const step = Math.sign(diff) * Math.min(Math.abs(diff), 12);
                activeUsers += step;
                if (Math.abs(activeUsers - randomUsers) < 3) activeUsers = randomUsers;

                // format with commas
                const formatted = activeUsers.toLocaleString();
                if (activeEl) activeEl.textContent = formatted;

                // random "new" count
                const newCount = Math.floor(Math.random() * 8) + 4;
                if (newEl) newEl.textContent = '+' + newCount;
            }

            // initial
            updateActiveUsers();

            // update every 4.5 seconds
            setInterval(updateActiveUsers, 4500);

            // also update on visibility change to keep fresh
            document.addEventListener('visibilitychange', function() {
                if (!document.hidden) updateActiveUsers();
            });
        })();
    </script>

</body>
</html>

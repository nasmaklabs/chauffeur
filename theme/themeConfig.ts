import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
    token: {
        fontSize: 16,
        colorPrimary: '#F7C600', // Taxi Yellow
        colorInfo: '#2563EB', // Trust Blue for links/actions
        colorSuccess: '#16A34A',
        colorWarning: '#F59E0B',
        colorError: '#DC2626',
        colorTextBase: '#1A1A1A',
        colorBgBase: '#FFFFFF',
        fontFamily: 'var(--font-inter)',
        borderRadius: 8, // Modern rounded corners
        colorTextLightSolid: '#1A1A1A', // Fix contrast for primary buttons (black text on yellow bg)
    },
    components: {
        Button: {
            primaryShadow: 'none',
            algorithm: true, // Enable algorithm for hover states
        },
        Input: {
            controlHeight: 44, // Taller inputs for better touch targets
        },
        Select: {
            controlHeight: 44,
        },
        Card: {
            borderRadiusLG: 12,
        },
        Tabs: {
            itemSelectedColor: '#1A1A1A', // Fix contrast for active tab text
            itemHoverColor: '#1A1A1A',
        },
        Menu: {
            itemBg: 'transparent',
            subMenuItemBg: 'transparent',
            itemBorderRadius: 0,
        }
    }
};

export default theme;

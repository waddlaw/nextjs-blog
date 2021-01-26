export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

// IDが取得できない場合を想定する
export const existsGaId = GA_TRACKING_ID !== ''

// PVを測定する
export const pageview = (url: URL) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// GAイベントを発火させる
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (!existsGaId) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
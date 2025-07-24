export const generateConfirmationHtml = ({
  name,
  orderId,
}: {
  to: string;
  name: string;
  orderId: string;
}) => {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
        <div style="padding: 24px; text-align: center; border-bottom: 1px solid #eee;">
          <img src="/images/logo.png" alt="FearNot-Logo" style="height: 40px;" />
          <h2 style="margin: 16px 0 0; font-size: 22px; color: #1f2937;">Order Confirmation</h2>
          <p style="margin-top: 4px; font-size: 14px; color: #6b7280;">Empowered by faith, driven by style</p>
        </div>

        <div style="padding: 32px;">
          <p style="font-size: 16px; color: #111827;">Hi <strong>${name}</strong>,</p>
          <p style="font-size: 15px; color: #4b5563; margin: 16px 0;">
            Thank you for shopping with <strong>FearNot Lifyestyle</strong>. Your order has been successfully placed and delivery is being processed. Your items will be delivered within 3-5 business days. You will recieve notification email when your items has been delivered. You can click the button below to view your order.
          </p>
          <p style="font-size: 15px; color: #4b5563; margin: 16px 0;">
            <strong>Order ID:</strong> <span style="color: #111827;">${orderId}</span>
          </p>

          <a href="https://your-domain.com/account/orders/${orderId}" style="display: inline-block; margin-top: 24px; background-color: #1e40af; color: white; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-weight: 500;">
            View My Order
          </a>

          <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <p style="font-size: 13px; color: #6b7280;">
            Need help or have questions? Just reply to this email or contact us at <a href="mailto:support@your-domain.com" style="color: #2563eb;">support@your-domain.com</a>.
          </p>

          <p style="font-size: 13px; color: #6b7280; margin-top: 24px;">
            Stay bold. Stay faithful. Stay fashionable. 🙏
          </p>
        </div>

        <div style="background: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
          &copy; ${new Date().getFullYear()} FearNot Lifestyle. All rights reserved.
        </div>
      </div>
    </div>
  `;
};

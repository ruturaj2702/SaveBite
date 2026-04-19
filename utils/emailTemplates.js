/**
 * SaveBite Email Templates
 * All emails are styled HTML for a professional look in Gmail.
 */

const BRAND_COLOR = '#10b981'; // emerald-500
const BRAND_NAME = '🥗 SaveBite';

const baseLayout = (title, bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- HEADER -->
          <tr>
            <td style="background:${BRAND_COLOR};padding:28px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">${BRAND_NAME}</h1>
              <p style="margin:6px 0 0;color:#d1fae5;font-size:13px;">Connecting Surplus Food with Those Who Need It</p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:36px 40px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">© 2026 SaveBite. All rights reserved.</p>
              <p style="margin:4px 0 0;color:#9ca3af;font-size:12px;">support@savebite.org</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const foodInfoTable = (food, donorName, donorAddress) => `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:0;margin:20px 0;">
    <tr><td style="padding:20px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:6px 0;color:#374151;font-size:14px;"><strong style="color:#065f46;">🍱 Food:</strong> &nbsp;${food.foodName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#374151;font-size:14px;"><strong style="color:#065f46;">📦 Quantity:</strong> &nbsp;${food.quantity}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#374151;font-size:14px;"><strong style="color:#065f46;">🥗 Type:</strong> &nbsp;${food.foodType}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#374151;font-size:14px;"><strong style="color:#065f46;">⏰ Expiry:</strong> &nbsp;${new Date(food.expiryTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
        </tr>
        ${donorName ? `<tr><td style="padding:6px 0;color:#374151;font-size:14px;"><strong style="color:#065f46;">🏨 Donor:</strong> &nbsp;${donorName}</td></tr>` : ''}
        ${donorAddress ? `<tr><td style="padding:6px 0;color:#374151;font-size:14px;"><strong style="color:#065f46;">📍 Address:</strong> &nbsp;${donorAddress}</td></tr>` : ''}
      </table>
    </td></tr>
  </table>
`;

/**
 * Email sent to all NGOs when a donor lists new food.
 */
const newFoodEmail = (food, donor) => ({
  subject: `🍱 New Food Available: ${food.foodName} — Act Fast!`,
  html: baseLayout(
    'New Food Available',
    `
    <h2 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">New Food Listing!</h2>
    <p style="margin:0 0 4px;color:#6b7280;font-size:15px;">A donor just listed food that needs a home. Claim it before it expires!</p>

    ${foodInfoTable(food, donor?.name, donor?.address)}

    <p style="color:#6b7280;font-size:13px;margin:24px 0 0;">Log in to your NGO dashboard to claim this listing.</p>
    `
  )
});

/**
 * Email sent to the donor when their food is claimed by an NGO.
 */
const foodClaimedByNgoEmail = (food, ngo) => ({
  subject: `✅ Your food "${food.foodName}" has been claimed by ${ngo?.name || 'an NGO'}`,
  html: baseLayout(
    'Food Claimed',
    `
    <h2 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">Great news! Your food was claimed. 🎉</h2>
    <p style="margin:0 0 4px;color:#6b7280;font-size:15px;">
      <strong>${ngo?.name || 'An NGO'}</strong> has claimed your food listing and will arrange pickup soon.
    </p>

    ${foodInfoTable(food)}

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:0;margin:20px 0;">
      <tr><td style="padding:16px 24px;">
        <p style="margin:0;color:#1e40af;font-size:14px;"><strong>🏢 Claimed by:</strong> ${ngo?.name || 'N/A'}</p>
        ${ngo?.address ? `<p style="margin:6px 0 0;color:#1e40af;font-size:14px;"><strong>📍 NGO Address:</strong> ${ngo.address}</p>` : ''}
      </td></tr>
    </table>

    <p style="color:#6b7280;font-size:13px;margin:24px 0 0;">Thank you for your generosity. A volunteer will be dispatched for pickup shortly.</p>
    `
  )
});

/**
 * Email sent to all volunteers when food is claimed and needs pickup.
 */
const pickupReadyEmail = (food, donor, ngo) => ({
  subject: `🚚 Pickup Task Available: ${food.foodName}`,
  html: baseLayout(
    'Pickup Task Ready',
    `
    <h2 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">A pickup task is ready for you! 🚚</h2>
    <p style="margin:0 0 4px;color:#6b7280;font-size:15px;">
      An NGO has claimed food and needs a volunteer to pick it up and deliver it.
    </p>

    ${foodInfoTable(food, donor?.name, donor?.address)}

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:0;margin:20px 0;">
      <tr><td style="padding:16px 24px;">
        <p style="margin:0;color:#1e40af;font-size:14px;"><strong>🏢 Deliver To (NGO):</strong> ${ngo?.name || 'N/A'}</p>
        ${ngo?.address ? `<p style="margin:6px 0 0;color:#1e40af;font-size:14px;"><strong>📍 NGO Address:</strong> ${ngo.address}</p>` : ''}
      </td></tr>
    </table>

    <p style="color:#6b7280;font-size:13px;margin:24px 0 0;">Log in to your Volunteer portal to accept this task.</p>
    `
  )
});

/**
 * Email sent to the NGO when a volunteer marks food as delivered.
 */
const foodDeliveredEmail = (food) => ({
  subject: `📦 Delivery Complete: "${food.foodName}" has arrived!`,
  html: baseLayout(
    'Food Delivered',
    `
    <h2 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">Food has been delivered! 📦</h2>
    <p style="margin:0 0 4px;color:#6b7280;font-size:15px;">
      A volunteer has successfully delivered the following food to your location.
    </p>

    ${foodInfoTable(food)}

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #86efac;border-radius:12px;padding:0;margin:20px 0;">
      <tr><td style="padding:16px 24px;text-align:center;">
        <p style="margin:0;color:#166534;font-size:16px;font-weight:700;">✅ Delivery Confirmed</p>
        <p style="margin:6px 0 0;color:#166534;font-size:13px;">The food is now in your care. Please distribute it responsibly.</p>
      </td></tr>
    </table>

    <p style="color:#6b7280;font-size:13px;margin:24px 0 0;">Thank you for being part of the SaveBite mission. Together we're reducing food waste!</p>
    `
  )
});

module.exports = {
  newFoodEmail,
  foodClaimedByNgoEmail,
  pickupReadyEmail,
  foodDeliveredEmail,
};

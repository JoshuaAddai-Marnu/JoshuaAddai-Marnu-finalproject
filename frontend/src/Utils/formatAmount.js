export function formatAmount(amount) {
  // Ensure the input is treated as a number
  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  // Create a NumberFormat object
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Format the number and return the result
  return formatter.format(num);
}

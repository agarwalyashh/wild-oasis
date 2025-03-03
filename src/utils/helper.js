import { formatDistance, parseISO, differenceInDays } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
	differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
	formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	})
		.replace("about ", "")
		.replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
	const today = new Date();

	// This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
	if (options?.end)
		// Set to the last second of the day
		today.setUTCHours(23, 59, 59, 999);
	else today.setUTCHours(0, 0, 0, 0);
	return today.toISOString();
};
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
export function formatDate(date) {
	const newDate = new Date(date);
	return (
		months[newDate.getMonth()] +
		" " +
		(newDate.getDate().toString().length == 1 ? "0" : "") +
		newDate.getDate() +
		"," +
		newDate.getFullYear()
	);
}
export function nights(startDate, endDate) {
	const diff = (
		(new Date(startDate) - new Date(endDate)) /
		(3600000 * 24)
	).toFixed(0);
	return Math.abs(diff);
}
export function calculate(date) {
	const today = new Date();
	const diff = ((today - new Date(date)) / (3600000 * 24)).toFixed(0);
	let s;
	if (diff > 0) s = diff.toString() + " Days Ago";
	else if (diff == 0) s = "Today";
	else s = "In " + Math.abs(diff.toString()) + " Days";
	return s;
}
export const formatCurrency = (value) =>
	new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
		value
	);

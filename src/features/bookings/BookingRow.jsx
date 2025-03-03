/* eslint-disable react/prop-types */
import { FaArrowRightLong } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculate, formatDate, nights } from "../../utils/helper";
const menuItems = ["See Details", "Edit"];
const status_background = {
	unconfirmed: "#e0f2fe",
	"checked-in": "#dcfce7",
	"checked-out": "#e5e7eb",
};
const status_text = {
	unconfirmed: "#0369a1",
	"checked-in": "#15803d",
	"checked-out": "#374151",
};
function BookingRow({ bookings }) {
	const navigate = useNavigate();

	const [menuID, setMenuID] = useState(null);

	function handleClick(id) {
		if (!menuID) setMenuID(id);
		else setMenuID(null);
	}

	function handleMenu(item, id) {
		if (item === "See Details") {
			navigate(`/bookings/${id}`);
		}
	}

	return (
		<>
			{bookings?.map((data) => (
				<div key={data.id} className="h-40">
					<div
						className="grid gap-4 grid-cols-[0.3fr_0.7fr_1fr_0.5fr_0.3fr_0.2fr] h-full font-sono items-center text-start px-10 bg-grey-0 w-full border-b-1 border-grey-300"
						role="row"
					>
						<p className="font-semibold">{data.cabins.name}</p>
						<div className="flex flex-col gap-2">
							<h1 className="font-semibold">{data.guests.fullName}</h1>
							<p>{data.guests.email}</p>
						</div>
						<div className="flex flex-col gap-2">
							<pre className="font-semibold flex items-center">
								{calculate(data.startDate)}{" "}
								<span>
									<FaArrowRightLong />
								</span>{" "}
								{nights(data.startDate, data.endDate)} nights stay
							</pre>
							<pre className="flex items-center h-full">
								{formatDate(data.startDate)}{" "}
								<span>
									<FaArrowRightLong />
								</span>{" "}
								{formatDate(data.endDate)}
							</pre>
						</div>
						<div className="flex items-center">
							<p
								className={`uppercase font-semibold text-[14px] border-1 rounded-full w-fit px-4`}
								style={{
									backgroundColor: status_background[data.status],
									color: status_text[data.status],
								}}
							>
								{data.status}
							</p>
						</div>
						<pre>$ {data.totalPrice.toFixed(2)}</pre>
						<div className="relative">
							<span
								className="cursor-pointer"
								onClick={() => handleClick(data.id)}
							>
								<CiMenuKebab size={24} />
							</span>
							{menuID === data.id && (
								<div className="w-45 bg-grey-0 flex flex-col gap-4 absolute top-10 left-8 z-1 rounded-md">
									{menuItems.map((item, index) => (
										<p
											key={index}
											className="hover:bg-grey-50 p-3 cursor-pointer"
											onClick={() => handleMenu(item, data.id)}
										>
											{item}
										</p>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default BookingRow;

import Page from "./page";

import beer from "./assets/beer.svg";
import adverts from "./assets/adverts.svg";
import code from "./assets/code.svg";
import hop from "./assets/hop.svg";
import keg from "./assets/keg.svg";
import mill from "./assets/mill.svg";
import screen from "./assets/screen.svg";
import shapes from "./assets/shapes.svg";

export default {
	component: Page,
	argTypes: {
		cols: {
			options: [
				"grid-cols-1",
				"grid-cols-2",
				"grid-cols-3",
				"grid-cols-4",
				"grid-cols-5",
				"grid-cols-6",
				"grid-cols-7",
				"grid-cols-8",
				"auto",
				"custom",
			],
			type: "select",
		},
		limit_Items_Max: {
			options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			control: "select",
		},
		limit_Items_Min: {
			options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			control: "select",
		},
		items: {
			control: {
				type: "object",
			},
		},
		dndStatus: {
			control: "object",
		},
	},
};

const itemsData = [
	{
		key: 1,
		icon: beer,
		desc: "minimizable",
	},
	{
		key: 2,
		icon: adverts,
		desc: "handy",
	},
	{
		key: 3,
		icon: code,
		desc: "investment",
	},
	{
		key: 4,
		icon: hop,
		desc: "numeric",
	},
	{
		key: 5,
		icon: keg,
		desc: "time_friendly",
	},
	{
		key: 6,
		icon: mill,
		desc: "budget_friendly",
	},
	{
		key: 7,
		icon: screen,
		desc: "strait",
	},
	{
		key: 8,
		icon: shapes,
		desc: "fun",
	},
];

const Template = (args) => {
	const filteredItems = itemsData.filter((item) =>
		args.items.some((argItem) => argItem.key === item.key)
	);

	return <Page {...args} items={filteredItems} />;
};

export const background = Template.bind({});
background.args = {
	cols: "auto",
	limit_Items_Max: 8,
	limit_Items_Min: 1,
	items: [
		{
			key: 1,
			icon: beer,
			desc: "minimizable",
		},
		{
			key: 2,
			icon: adverts,
			desc: "handy",
		},
		{
			key: 3,
			icon: code,
			desc: "investment",
		},
		{
			key: 4,
			icon: hop,
			desc: "numeric",
		},
		{
			key: 5,
			icon: keg,
			desc: "time_friendly",
		},
		{
			key: 6,
			icon: mill,
			desc: "budget_friendly",
		},
		{
			key: 7,
			icon: screen,
			desc: "strait",
		},
		{
			key: 8,
			icon: shapes,
			desc: "fun",
		},
	],
	dndStatus: {
		minimizable: true,
		handy: true,
		investment: true,
		numeric: true,
		time_friendly: true,
		budget_friendly: true,
		strait: true,
		fun: true,
	},
};

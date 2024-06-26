"use client";

import PropTypes from "prop-types";
import useSkillStore from "@/store";
//Dnd kit
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";

import { useEffect, useState } from "react";
import {
	SortableContext,
	arrayMove,
	rectSortingStrategy,
	sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import DraggableElement from "@/components/DraggableElement";
import Image from "next/image";

export default function Home({
	items,
	cols,
	limit_Items_Max,
	limit_Items_Min,
	dndStatus,
}) {
	//getting needed states from our store
	const { skills, removeSkill, addSkill } = useSkillStore((state) => ({
		skills: state.skills,
		removeSkill: state.removeSkill,
		addSkill: state.addSkill,
	}));

	//state in which our selected icons which are also draggable are stored into
	const [draggingSkills, setDraggingSkills] = useState([]);

	//when the user clicks on the green add button this gets invoked
	const handleSkillSubmit = (avatar, key, desc) => {
		if (skills.length < limit_Items_Max) {
			addSkill({
				id: key,
				desc: desc,
				title: avatar,
			});
		} else {
			console.log("skill set is full");
		}
	};

	//handling when remove button is pressed
	const handleRemoveSkill = (id) => {
		removeSkill(id);
	};

	useEffect(() => {
		setDraggingSkills(skills);
	}, [skills]);

	//Submit form function gets invoked when clicked
	const handleFullFormSunmition = () => {
		console.log("skills saved successfully!!");
	};

	//drag and drop
	const handleDragEnd = (event) => {
		const { active, over } = event;

		const getTaskPos = (id) =>
			draggingSkills.findIndex((item) => item.id === id);
		if (active.id !== over.id) {
			setDraggingSkills((items) => {
				const oldIndex = getTaskPos(active.id);
				const newIndex = getTaskPos(over.id);
				console.log(oldIndex);
				console.log(newIndex);
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};
	const sensors = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));

	//Grid for items
	const getGridClasses = () => {
		if (cols === "auto") {
			return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4";
		} else if (cols === "custom") {
			return "flex flex-wrap justify-around gap-6";
		} else {
			return `grid ${cols} gap-4`;
		}
	};

	return (
		<div className="h-lvh   w-full bg-gray-200 flex  justify-center items-center">
			<div className=" max-w-6xl overflow-x-hidden overflow-y-scroll h-lvh w-full sm:px-10 py-8 shadow-lg flex flex-col">
				<div className="flex justify-center">
					<h1 className="text-center mb-5 text-xl font-semibold">
						drag and drop
					</h1>
				</div>

				<div className="border border-dotted border-gray-400 w-full p-6  rounded-lg flex justify-center">
					<div className={getGridClasses()}>
						<DndContext
							sensors={sensors}
							onDragEnd={handleDragEnd}
							collisionDetection={closestCenter}>
							<SortableContext
								items={draggingSkills}
								strategy={rectSortingStrategy}>
								{draggingSkills.map((skill, i) => (
									<div key={i} style={{ touchAction: "manipulation" }}>
										{dndStatus[skill.desc] ? (
											<DraggableElement
												handleRemoveSkill={handleRemoveSkill}
												key={i}
												id={skill.id}
												title={skill.title}
											/>
										) : (
											<div className="flex justify-between">
												<div>
													<button
														onClick={"() => removeSkill(skill.id)"}
														className="bg-gray-500 px-[6.5px] py-[0px]  flex items-center rounded-full text-sm  translate-x-20 translate-y-3 z-40">
														-
													</button>
													<div className=" border border-dotted border-gray-300 sm:p-6 p-3 bg-gray-300  rounded-xl">
														<div className="w-12">
															<Image src={skill.title} />
														</div>
													</div>
												</div>
											</div>
										)}
									</div>
								))}
							</SortableContext>
						</DndContext>
					</div>
				</div>
				<h1 className="mt-10 text-xl text-center font-semibold">Skills</h1>
				<div className="mt-10 flex justify-center">
					<div className={getGridClasses()}>
						{items?.map((item, i) => (
							<div key={i}>
								<div className="flex items-center justify-center ">
									<div className="w-20">
										<Image src={item.icon} width={200} height={200} />
									</div>
								</div>
								<button
									disabled={skills.some((info) => info.id === item.key)}
									onClick={() =>
										handleSkillSubmit(item.icon, item.key, item.desc)
									}
									className="bg-green-500 px-[6px] py-[0px]  flex items-center rounded-full text-sm  translate-x-20 -translate-y-20 disabled:bg-gray-400">
									+
								</button>
								<div>
									<h1 className="text-gray-500 text-center">{item.desc}</h1>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="w-full flex flex-col justify-center items-center mt-10">
					<button
						onClick={handleFullFormSunmition}
						disabled={draggingSkills.length < limit_Items_Min ? true : false}
						className="text-semibold bg-blue-500 py-2 px-4 rounded-full text-white">
						submit
					</button>
				</div>
			</div>
		</div>
	);
}

Home.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.element.isRequired,
			key: PropTypes.number.isRequired,
			desc: PropTypes.string.isRequired,
		})
	).isRequired,
	cols: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(["auto"])])
		.isRequired,
	limit_Items_Max: PropTypes.number.isRequired,
	limit_Items_Min: PropTypes.number.isRequired,
	dndStatus: PropTypes.object.isRequired,
};

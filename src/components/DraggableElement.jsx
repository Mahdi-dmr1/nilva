import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { TiPin } from "react-icons/ti";

export default function DraggableElement({ id, title, handleRemoveSkill }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		width: "100px",
		height: "100px",
		zIndex: isDragging ? "100" : "auto",
		opacity: isDragging ? 0.3 : 1,
	};
	return (
		<div className="flex  justify-between">
			<div>
				<button
					onClick={() => handleRemoveSkill(id)}
					className="bg-red-500 px-[6.5px] py-[0px]  flex items-center rounded-full text-sm  translate-x-20 translate-y-3 z-40">
					-
				</button>
				<div
					style={style}
					ref={setNodeRef}
					{...listeners}
					{...attributes}
					className=" border border-dotted border-gray-300 sm:p-6 p-3  rounded-xl">
					<Image src={title} />
				</div>
			</div>
		</div>
	);
}

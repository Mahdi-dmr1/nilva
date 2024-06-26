import { create } from "zustand";

const store = (set) => ({
	skills: [],
	addSkill: (skill) => {
		set((state) => ({
			skills: [skill, ...state.skills],
		}));
		console.log("skill added");
	},
	removeSkill: (skiiId) => {
		set((state) => ({
			skills: state.skills.filter((s) => s.id !== skiiId),
		}));
		console.log("skill removed");
	},
});

const useSkillStore = create(store);

export default useSkillStore;

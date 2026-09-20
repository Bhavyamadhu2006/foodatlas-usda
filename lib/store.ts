"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Goals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
};

type FoodLog = {
  id: string;
  name: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  createdAt: string;
};

type WeightEntry = { date: string; weight: number };

type State = {
  name: string;
  goals: Goals;
  logs: FoodLog[];
  completedWorkouts: number[];
  weights: WeightEntry[];
  setName: (name: string) => void;
  setGoals: (goals: Goals) => void;
  addFood: (food: Omit<FoodLog, "id" | "createdAt">) => void;
  removeFood: (id: string) => void;
  toggleWorkout: (day: number) => void;
  addWeight: (weight: number) => void;
};

export const useAppStore = create<State>()(
  persist(
    (set) => ({
      name: "",
      goals: { calories: 1500, protein: 100, carbs: 150, fat: 50, fiber: 30 },
      logs: [],
      completedWorkouts: [],
      weights: [],
      setName: (name) => set({ name }),
      setGoals: (goals) => set({ goals }),
      addFood: (food) =>
        set((state) => ({
          logs: [
            ...state.logs,
            {
              ...food,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString()
            }
          ]
        })),
      removeFood: (id) => set((state) => ({ logs: state.logs.filter(x => x.id !== id) })),
      toggleWorkout: (day) =>
        set((state) => ({
          completedWorkouts: state.completedWorkouts.includes(day)
            ? state.completedWorkouts.filter(x => x !== day)
            : [...state.completedWorkouts, day]
        })),
      addWeight: (weight) =>
        set((state) => ({
          weights: [...state.weights, { date: new Date().toISOString().slice(0, 10), weight }]
        }))
    }),
    { name: "my-fitness-diet-store" }
  )
);

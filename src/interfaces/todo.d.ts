interface ITodo {
  id: string;
  todo: string;
  createdAt: Date | string;
  completedAt: Date | string | null;
  isCompleted: boolean;
};

export type {
  ITodo,
};

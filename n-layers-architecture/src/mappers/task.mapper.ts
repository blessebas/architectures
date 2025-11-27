import { TaskEntity } from "../domain/task.entity";
import { TaskResponseDTO } from "../dtos/task.dto";

export const toTaskResponseDTO = (t: TaskEntity): TaskResponseDTO => ({
  id: t.id,
  title: t.title,
  description: t.description,
  done: t.done,
  ownerId: t.ownerId,
  createdAt: (t.createdAt ?? new Date()).toISOString(),
});

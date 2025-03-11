import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TasksDocument = HydratedDocument<Tasks>;

type TasksStatus = 'à faire' | 'en cours' | 'terminé';

@Schema({
  collection: 'tasks',
})
export class Tasks {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    enum: ['à faire', 'en cours', 'terminé'],
    default: 'à faire',
  })
  status: TasksStatus;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);

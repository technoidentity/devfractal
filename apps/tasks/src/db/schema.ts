import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const admin = sqliteTable('admin', {
  id: integer('id').primaryKey(),
  name: text('name'),
  email: text('email'),
});

export const students = sqliteTable('students', {
  id: integer('id').primaryKey(),
  name: text('name'),
  email: text('email'),
});

export const teachers = sqliteTable('teachers', {
  id: integer('id').primaryKey(),
  name: text('name'),
  email: text('email'),
});

export const courses = sqliteTable('courses', {
  id: integer('id').primaryKey(),
  name: text('name'),
  description: text('description'),
  teacherId: integer('teacher_id').notNull().references(() => teachers.id),
});

export const courseToStudent = sqliteTable('courseToStudent', {
  courseId: integer('course_id').notNull().references(() => courses.id),
  studentId: integer('student_id').notNull().references(() => students.id),
});

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey(),
  name: text('name'),
  course: integer('course_id').notNull().references(() => courses.id),
})

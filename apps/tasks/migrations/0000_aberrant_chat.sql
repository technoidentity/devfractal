CREATE TABLE `admin` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`email` text
);
--> statement-breakpoint
CREATE TABLE `courseToStudent` (
	`course_id` integer NOT NULL,
	`student_id` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`),
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`description` text,
	`teacher_id` integer NOT NULL,
	FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`)
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`email` text
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`course_id` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`)
);
--> statement-breakpoint
CREATE TABLE `teachers` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`email` text
);

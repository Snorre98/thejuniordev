import type { ReactNode } from "react";

export type Children = ReactNode;

export type Screens =
	| "lock"
	| "home"
	| "messages"
	| "bio"
	| "chat"
	| "project"
	| "loading"
	| "error";

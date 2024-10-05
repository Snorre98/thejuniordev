import { BioDisplay, ChatDisplay, HomeDisplay, LockDisplay, MessagesDisplay, ProjectDisplay } from './Display';

export const routes = [
  { path: '/', component: LockDisplay },
  { path: '/home', component: HomeDisplay },
  { path: '/messages', component: MessagesDisplay },
  { path: '/chat/:threadId', component: ChatDisplay },
  { path: '/project', component: ProjectDisplay },
  { path: '/bio', component: BioDisplay },
];

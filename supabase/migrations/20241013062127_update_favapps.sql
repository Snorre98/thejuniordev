alter table "public"."favorite_apps" add column "project" bigint;

alter table "public"."favorite_apps" add constraint "favorite_apps_project_fkey" FOREIGN KEY (project) REFERENCES project(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."favorite_apps" validate constraint "favorite_apps_project_fkey";



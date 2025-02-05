drop policy "Enable read access for all users" on "public"."chat_messages";

revoke delete on table "public"."chat_messages" from "anon";

revoke insert on table "public"."chat_messages" from "anon";

revoke references on table "public"."chat_messages" from "anon";

revoke select on table "public"."chat_messages" from "anon";

revoke trigger on table "public"."chat_messages" from "anon";

revoke truncate on table "public"."chat_messages" from "anon";

revoke update on table "public"."chat_messages" from "anon";

revoke delete on table "public"."chat_messages" from "authenticated";

revoke insert on table "public"."chat_messages" from "authenticated";

revoke references on table "public"."chat_messages" from "authenticated";

revoke select on table "public"."chat_messages" from "authenticated";

revoke trigger on table "public"."chat_messages" from "authenticated";

revoke truncate on table "public"."chat_messages" from "authenticated";

revoke update on table "public"."chat_messages" from "authenticated";

revoke delete on table "public"."chat_messages" from "service_role";

revoke insert on table "public"."chat_messages" from "service_role";

revoke references on table "public"."chat_messages" from "service_role";

revoke select on table "public"."chat_messages" from "service_role";

revoke trigger on table "public"."chat_messages" from "service_role";

revoke truncate on table "public"."chat_messages" from "service_role";

revoke update on table "public"."chat_messages" from "service_role";

alter table "public"."chat_messages" drop constraint "chat_messages_pkey";

drop index if exists "public"."chat_messages_pkey";

drop table "public"."chat_messages";

create table "public"."chat_message" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "message_text" text not null default ''::text,
    "sender" uuid,
    "thread" uuid
);


alter table "public"."chat_message" enable row level security;

create table "public"."chat_thread" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_1" uuid,
    "user_2" uuid
);


alter table "public"."chat_thread" enable row level security;

create table "public"."user" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_name" text default ''::text,
    "avatar" character varying
);


alter table "public"."user" enable row level security;

CREATE UNIQUE INDEX chat_message_pkey ON public.chat_message USING btree (id);

CREATE UNIQUE INDEX chat_thread_pkey ON public.chat_thread USING btree (id);

CREATE UNIQUE INDEX chat_thread_user_1_key ON public.chat_thread USING btree (user_1);

CREATE UNIQUE INDEX chat_thread_user_2_key ON public.chat_thread USING btree (user_2);

CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);

CREATE UNIQUE INDEX user_user_name_key ON public."user" USING btree (user_name);

alter table "public"."chat_message" add constraint "chat_message_pkey" PRIMARY KEY using index "chat_message_pkey";

alter table "public"."chat_thread" add constraint "chat_thread_pkey" PRIMARY KEY using index "chat_thread_pkey";

alter table "public"."user" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

alter table "public"."chat_message" add constraint "chat_message_sender_fkey" FOREIGN KEY (sender) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."chat_message" validate constraint "chat_message_sender_fkey";

alter table "public"."chat_message" add constraint "chat_message_thread_fkey" FOREIGN KEY (thread) REFERENCES chat_thread(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."chat_message" validate constraint "chat_message_thread_fkey";

alter table "public"."chat_thread" add constraint "chat_thread_user_1_fkey" FOREIGN KEY (user_1) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."chat_thread" validate constraint "chat_thread_user_1_fkey";

alter table "public"."chat_thread" add constraint "chat_thread_user_1_key" UNIQUE using index "chat_thread_user_1_key";

alter table "public"."chat_thread" add constraint "chat_thread_user_2_fkey" FOREIGN KEY (user_2) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."chat_thread" validate constraint "chat_thread_user_2_fkey";

alter table "public"."chat_thread" add constraint "chat_thread_user_2_key" UNIQUE using index "chat_thread_user_2_key";

alter table "public"."user" add constraint "user_user_name_key" UNIQUE using index "user_user_name_key";

grant delete on table "public"."chat_message" to "anon";

grant insert on table "public"."chat_message" to "anon";

grant references on table "public"."chat_message" to "anon";

grant select on table "public"."chat_message" to "anon";

grant trigger on table "public"."chat_message" to "anon";

grant truncate on table "public"."chat_message" to "anon";

grant update on table "public"."chat_message" to "anon";

grant delete on table "public"."chat_message" to "authenticated";

grant insert on table "public"."chat_message" to "authenticated";

grant references on table "public"."chat_message" to "authenticated";

grant select on table "public"."chat_message" to "authenticated";

grant trigger on table "public"."chat_message" to "authenticated";

grant truncate on table "public"."chat_message" to "authenticated";

grant update on table "public"."chat_message" to "authenticated";

grant delete on table "public"."chat_message" to "service_role";

grant insert on table "public"."chat_message" to "service_role";

grant references on table "public"."chat_message" to "service_role";

grant select on table "public"."chat_message" to "service_role";

grant trigger on table "public"."chat_message" to "service_role";

grant truncate on table "public"."chat_message" to "service_role";

grant update on table "public"."chat_message" to "service_role";

grant delete on table "public"."chat_thread" to "anon";

grant insert on table "public"."chat_thread" to "anon";

grant references on table "public"."chat_thread" to "anon";

grant select on table "public"."chat_thread" to "anon";

grant trigger on table "public"."chat_thread" to "anon";

grant truncate on table "public"."chat_thread" to "anon";

grant update on table "public"."chat_thread" to "anon";

grant delete on table "public"."chat_thread" to "authenticated";

grant insert on table "public"."chat_thread" to "authenticated";

grant references on table "public"."chat_thread" to "authenticated";

grant select on table "public"."chat_thread" to "authenticated";

grant trigger on table "public"."chat_thread" to "authenticated";

grant truncate on table "public"."chat_thread" to "authenticated";

grant update on table "public"."chat_thread" to "authenticated";

grant delete on table "public"."chat_thread" to "service_role";

grant insert on table "public"."chat_thread" to "service_role";

grant references on table "public"."chat_thread" to "service_role";

grant select on table "public"."chat_thread" to "service_role";

grant trigger on table "public"."chat_thread" to "service_role";

grant truncate on table "public"."chat_thread" to "service_role";

grant update on table "public"."chat_thread" to "service_role";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";

create policy "Enable read access for all users"
on "public"."user"
as permissive
for select
to anon
using (true);




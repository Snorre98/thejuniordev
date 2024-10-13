create table "public"."bio_category" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "category" character varying
);


alter table "public"."bio_category" enable row level security;

create table "public"."bio_item" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "title" text,
    "start" timestamp with time zone,
    "end" timestamp with time zone,
    "description" text,
    "completed" boolean,
    "item_category" character varying
);


alter table "public"."bio_item" enable row level security;

CREATE UNIQUE INDEX bio_category_category_key ON public.bio_category USING btree (category);

CREATE UNIQUE INDEX bio_category_pkey ON public.bio_category USING btree (id);

CREATE UNIQUE INDEX bio_item_pkey ON public.bio_item USING btree (id);

alter table "public"."bio_category" add constraint "bio_category_pkey" PRIMARY KEY using index "bio_category_pkey";

alter table "public"."bio_item" add constraint "bio_item_pkey" PRIMARY KEY using index "bio_item_pkey";

alter table "public"."bio_category" add constraint "bio_category_category_key" UNIQUE using index "bio_category_category_key";

alter table "public"."bio_item" add constraint "bio_item_item_category_fkey" FOREIGN KEY (item_category) REFERENCES bio_category(category) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."bio_item" validate constraint "bio_item_item_category_fkey";

grant delete on table "public"."bio_category" to "anon";

grant insert on table "public"."bio_category" to "anon";

grant references on table "public"."bio_category" to "anon";

grant select on table "public"."bio_category" to "anon";

grant trigger on table "public"."bio_category" to "anon";

grant truncate on table "public"."bio_category" to "anon";

grant update on table "public"."bio_category" to "anon";

grant delete on table "public"."bio_category" to "authenticated";

grant insert on table "public"."bio_category" to "authenticated";

grant references on table "public"."bio_category" to "authenticated";

grant select on table "public"."bio_category" to "authenticated";

grant trigger on table "public"."bio_category" to "authenticated";

grant truncate on table "public"."bio_category" to "authenticated";

grant update on table "public"."bio_category" to "authenticated";

grant delete on table "public"."bio_category" to "service_role";

grant insert on table "public"."bio_category" to "service_role";

grant references on table "public"."bio_category" to "service_role";

grant select on table "public"."bio_category" to "service_role";

grant trigger on table "public"."bio_category" to "service_role";

grant truncate on table "public"."bio_category" to "service_role";

grant update on table "public"."bio_category" to "service_role";

grant delete on table "public"."bio_item" to "anon";

grant insert on table "public"."bio_item" to "anon";

grant references on table "public"."bio_item" to "anon";

grant select on table "public"."bio_item" to "anon";

grant trigger on table "public"."bio_item" to "anon";

grant truncate on table "public"."bio_item" to "anon";

grant update on table "public"."bio_item" to "anon";

grant delete on table "public"."bio_item" to "authenticated";

grant insert on table "public"."bio_item" to "authenticated";

grant references on table "public"."bio_item" to "authenticated";

grant select on table "public"."bio_item" to "authenticated";

grant trigger on table "public"."bio_item" to "authenticated";

grant truncate on table "public"."bio_item" to "authenticated";

grant update on table "public"."bio_item" to "authenticated";

grant delete on table "public"."bio_item" to "service_role";

grant insert on table "public"."bio_item" to "service_role";

grant references on table "public"."bio_item" to "service_role";

grant select on table "public"."bio_item" to "service_role";

grant trigger on table "public"."bio_item" to "service_role";

grant truncate on table "public"."bio_item" to "service_role";

grant update on table "public"."bio_item" to "service_role";

create policy "Enable read access for all users"
on "public"."bio_item"
as permissive
for select
to anon
using (true);




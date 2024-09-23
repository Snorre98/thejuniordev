drop policy "Enable read access for all users" on "public"."chat_messages";

create policy "Enable read access for all users"
on "public"."chat_messages"
as permissive
for select
to anon
using (true);



create schema if not exists "thejuniordev";



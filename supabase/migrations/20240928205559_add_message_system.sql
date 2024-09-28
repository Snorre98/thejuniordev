create policy "Enable read access for all users"
on "public"."chat_message"
as permissive
for select
to anon
using (true);


create policy "Enable read access for all users"
on "public"."chat_thread"
as permissive
for select
to anon
using (true);




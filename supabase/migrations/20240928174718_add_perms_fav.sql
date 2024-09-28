create policy "Enable read access for all users"
on "public"."favorite_apps"
as permissive
for select
to anon
using (true);




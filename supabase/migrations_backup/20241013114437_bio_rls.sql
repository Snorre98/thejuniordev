create policy "Enable read access for all users"
on "public"."bio_category"
as permissive
for select
to anon
using (true);




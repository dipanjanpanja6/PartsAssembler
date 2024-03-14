# Relation

```sql
select p.* from parts p
    inner JOIN parts_links r ON p.id = r.parts_rel_id OR p.id = r.parts_id
where (r.parts_id = 3 or r.parts_rel_id=3) and not p.id=3 group by p.id
```
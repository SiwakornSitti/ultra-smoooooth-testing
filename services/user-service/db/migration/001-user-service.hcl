schema "public" {}

table "users" {
  schema = schema.public
  column "id" {
    null = false
    type = varchar(255)
  }
  column "name" {
    null = false
    type = varchar(255)
  }
  column "email" {
    null = false
    type = varchar(255)
  }
  column "phone" {
    null = false
    type = varchar(50)
  }
  column "status" {
    null = false
    type = varchar(50)
    default = "'active'"
  }
  primary_key {
    columns = [column.id]
  }
}

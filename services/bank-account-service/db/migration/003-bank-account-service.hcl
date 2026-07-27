schema "public" {}

table "accounts" {
  schema = schema.public
  column "id" {
    null = false
    type = varchar(255)
  }
  column "user_id" {
    null = false
    type = varchar(255)
  }
  column "balance" {
    null = false
    type = decimal(15, 2)
  }
  column "currency" {
    null = false
    type = varchar(10)
  }
  primary_key {
    columns = [column.id]
  }
}

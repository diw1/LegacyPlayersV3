#[derive(Debug, Clone, Serialize, JsonSchema)]
pub struct Language {
  pub id: u8,
  pub name: String,
  pub short_code: String
}


use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::data::Data;
use crate::modules::data::tools::RetrieveItemsetEffect;
use crate::modules::data::domain_value::ItemsetEffect;

#[openapi]
#[get("/itemset_effect/<expansion_id>/<itemset_id>")]
pub fn get_itemset_effects(me: State<Data>, expansion_id: u8, itemset_id: u16) -> Option<Json<Vec<ItemsetEffect>>> {
  me.get_itemset_effects(expansion_id, itemset_id)
    .and_then(|result| Some(Json(result)))
}
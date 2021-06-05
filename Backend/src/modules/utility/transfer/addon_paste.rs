use crate::modules::utility::domain_value::Paste;
use crate::modules::utility::dto::{UtilityFailure, PasteDto};
use crate::modules::utility::Utility;
use rocket::State;
use rocket_contrib::json::Json;
use crate::modules::utility::tools::{RetrieveAddonPaste, UpdateAddonPaste};
use crate::MainDb;
use crate::modules::account::guard::Authenticate;

#[openapi]
#[get("/addon_paste/<id>")]
pub fn get_addon_paste(me: State<Utility>, id: u32) -> Result<Json<Paste>, UtilityFailure> {
    me.get_addon_paste(id).ok_or(UtilityFailure::InvalidInput).map(Json)
}

#[openapi]
#[get("/addon_paste")]
pub fn get_addon_pastes(me: State<Utility>) -> Json<Vec<Paste>> {
    Json(me.get_addon_pastes())
}

#[openapi]
#[post("/addon_paste", data = "<paste>")]
pub fn replace_addon_paste(mut db_main: MainDb, me: State<Utility>, paste: Json<PasteDto>, auth: Authenticate) -> Result<Json<u32>, UtilityFailure> {
    me.replace_addon_paste(&mut (*db_main), paste.into_inner(), auth.0).map(Json)
}
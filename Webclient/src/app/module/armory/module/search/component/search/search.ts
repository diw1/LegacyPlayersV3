import {Component} from "@angular/core";
import {HeaderColumn} from "../../../../../../template/table/module/table_header/domain_value/header_column";
import {BodyColumn} from "../../../../../../template/table/module/table_body/domain_value/body_column";
import {CharacterSearchService} from "../../service/character_search";
import {table_init_filter} from "../../../../../../template/table/utility/table_init_filter";
import {init_body_columns_from_result} from "../../../../../../template/table/utility/table_init_body";

@Component({
    selector: "Search",
    templateUrl: "./search.html",
    styleUrls: ["./search.scss"]
})
export class SearchComponent {

    character_header_columns: HeaderColumn[] = [
        { index: 0, filter_name: 'name', labelKey: "Name", type: 0, type_range: null },
        { index: 1, filter_name: 'gender', labelKey: "Gender", type: 3, type_range: ['General.gender_0', 'General.gender_1'] },
        { index: 2, filter_name: 'server', labelKey: "Server", type: 3, type_range: ['0', '1', '2'] },
        { index: 3, filter_name: 'race', labelKey: "Race", type: 3, type_range: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
        { index: 4, filter_name: 'faction', labelKey: "Faction", type: 3, type_range: ['General.faction_0', 'General.faction_1'] },
        { index: 5, filter_name: 'hero_class', labelKey: "Class", type: 3, type_range: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
        { index: 6, filter_name: 'last_updated', labelKey: "Last update", type: 2, type_range: null },
    ];

    character_body_columns: BodyColumn[][] = [];
    clientSide: boolean = false;

    constructor(
        private characterSearchService: CharacterSearchService
    ) {
        this.filterCharacterSearch(table_init_filter(this.character_header_columns));
    }

    filterCharacterSearch(filter: any): void {
        this.characterSearchService.search_characters(filter,
            (result) => this.character_body_columns = init_body_columns_from_result(result, this.character_header_columns),
            () => {});
    }

}

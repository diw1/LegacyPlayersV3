import {Component, OnInit} from "@angular/core";
import {Paste} from "../../../../domain_value/paste";
import {Meta, Title} from "@angular/platform-browser";
import {TAGS} from "../../../../../data/tags";
import {NotificationService} from "../../../../../../../../service/notification";
import {Severity} from "../../../../../../../../domain_value/severity";
import {Clipboard} from "@angular/cdk/clipboard";
import {AccountInformation} from "../../../../../../../account/domain_value/account_information";
import {SettingsService} from "../../../../../../../../service/settings";
import {ActivatedRoute} from "@angular/router";
import {APIService} from "../../../../../../../../service/api";

@Component({
    selector: "Viewer",
    templateUrl: "./viewer.html",
    styleUrls: ["./viewer.scss"],
})
export class ViewerComponent implements OnInit {
    private static URL_GET_PASTE: string = "/utility/addon_paste/:id";

    paste: Paste;

    private account_information: AccountInformation;

    constructor(
        private metaService: Meta,
        private titleService: Title,
        private notificationService: NotificationService,
        private clipboard: Clipboard,
        private settingsService: SettingsService,
        private activatedRoute: ActivatedRoute,
        private apiService: APIService
    ) {
        this.titleService.setTitle("LegacyPlayers - Addon paste viewer");
        this.metaService.updateTag({
            name: "description",
            content: "Addon configuration pastes for Vanilla, TBC and WotLK. Pastes include for example WeakAuras, ElvUi Exports or simply lua configuration."
        });
        this.activatedRoute.paramMap.subscribe(params => {
            if (Number(params.get("id")) <= 0)
                return;

            this.apiService.get(ViewerComponent.URL_GET_PASTE.replace(":id", Number(params.get("id")).toString()),
                (paste) => {
                    this.paste = paste;
                    this.titleService.setTitle(this.paste.title);
                    this.metaService.updateTag({
                        name: "description",
                        content: this.paste.description
                    });
                });
        });
    }

    ngOnInit(): void {
        this.account_information = this.settingsService.get("ACCOUNT_INFORMATION");
    }

    save_to_clipboard(): void {
        this.clipboard.copy(this.paste.content);
        this.notificationService.propagate(Severity.Success, "Paste saved to clipboard!");
    }

    delete(): void {

    }

    get tags(): string {
        if (!this.paste)
            return "";
        return this.paste.tags.map(tag => TAGS[tag]).join(", ");
    }

    get is_paste_owner(): boolean {
        return !!this.account_information && !!this.paste && this.account_information.id === this.paste.member_id;
    }
}

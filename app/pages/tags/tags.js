var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Tags page
 * Created by Michael DESIGAUD on 04/02/2016.
 */
var ionic_1 = require('ionic-framework/ionic');
var TagsPage = (function () {
    function TagsPage() {
        this.getTags();
    }
    TagsPage.prototype.getTags = function () {
        var tagsJSON = localStorage.getItem('NFC-APP-TAGS');
        if (tagsJSON) {
            this.tags = JSON.parse(tagsJSON);
        }
    };
    TagsPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/tags/tags.html'
        })
    ], TagsPage);
    return TagsPage;
})();
exports.TagsPage = TagsPage;
//# sourceMappingURL=tags.js.map
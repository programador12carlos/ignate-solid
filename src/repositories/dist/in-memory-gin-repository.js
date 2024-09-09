"use strict";
exports.__esModule = true;
exports.InMemoryGinRepository = void 0;
var InMemoryGinRepository = /** @class */ (function () {
    function InMemoryGinRepository() {
        this.items = [];
    }
    InMemoryGinRepository.prototype.ProcurarId = function (id) {
        var procurarid = this.items.find(function (item) { return item.id === id; });
        if (!procurarid) {
            // Retorna null encapsulado em uma Promise
            return Promise.resolve(null);
        }
        // Retorna o item encontrado também encapsulado em uma Promise
        return Promise.resolve(procurarid);
    };
    return InMemoryGinRepository;
}());
exports.InMemoryGinRepository = InMemoryGinRepository;

var Renderer = (function () {
    function Renderer() {
    }
    Renderer.prototype.renderTokens = function (tokens) {
        var retString = "";
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].openTag) {
                retString = retString + tokens[i].openTag;
            }
            if (tokens[i].text) {
                retString = retString + tokens[i].text.source;
                if (tokens[i].inlineTokens) {
                    retString = retString + this.renderTokens(tokens[i].inlineTokens);
                }
            }
            if (tokens[i].closeTag) {
                retString = retString + tokens[i].closeTag;
            }
        }
        return retString;
    };
    return Renderer;
})();
exports.Renderer = Renderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoidHMvIiwic291cmNlcyI6WyJzcmMvUmVuZGVyZXIudHMiXSwibmFtZXMiOlsiUmVuZGVyZXIiLCJSZW5kZXJlci5jb25zdHJ1Y3RvciIsIlJlbmRlcmVyLnJlbmRlclRva2VucyJdLCJtYXBwaW5ncyI6IkFBRUE7SUFBQUE7SUFtQkFDLENBQUNBO0lBbEJBRCwrQkFBWUEsR0FBWkEsVUFBYUEsTUFBcUJBO1FBQ2pDRSxJQUFJQSxTQUFTQSxHQUFXQSxFQUFFQSxDQUFDQTtRQUMzQkEsR0FBR0EsQ0FBQUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7WUFDdkNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsU0FBU0EsR0FBR0EsU0FBU0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDM0NBLENBQUNBO1lBQ0RBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNwQkEsU0FBU0EsR0FBR0EsU0FBU0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQzlDQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDNUJBLFNBQVNBLEdBQUdBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO2dCQUNuRUEsQ0FBQ0E7WUFDRkEsQ0FBQ0E7WUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxTQUFTQSxHQUFHQSxTQUFTQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUM1Q0EsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFDREEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7SUFDbEJBLENBQUNBO0lBQ0ZGLGVBQUNBO0FBQURBLENBQUNBLEFBbkJELElBbUJDO0FBbkJZLGdCQUFRLFdBbUJwQixDQUFBIn0=
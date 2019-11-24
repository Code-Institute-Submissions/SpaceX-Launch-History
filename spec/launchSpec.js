describe("Calculator", function(){
    describe("Addition tests", function(){
        it("Should return 42", function(){
            expect(addition(20,22)).toBe(41);
        })
        it("Should return 26", function(){
            expect(addition(7,19)).toBe(26);
        })
        it("Should return an error if not num", function(){
            spyOn(window, "alert"); //Window is the object to watch and alert is the method of the object
            addition("Hitch", "Hiker");
            expect(window.alert).toHaveBeenCalledWith("Error!")
        })
    })
})
(function () {
    var gender = new Gender({
        instanceId: {%= CurrentADC.InstanceId %},
        currentQuestion: '{%:= CurrentQuestion.Shortcut %}'
    });
} ());
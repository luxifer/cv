$('.contact').on('click', function(e) {
    e.preventDefault();
    var form = $(this).closest('form');

    $.post("/contact", form.serialize(), function(data) {
        $('#contact').modal('hide');
    });
});

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using servicios_web_proyecto.Context;
using servicios_web_proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReservationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<ReservationsController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Reservations.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<ReservationsController>/5
        [HttpGet("{id}", Name = "GetReservation")]
        public ActionResult Get(string id)
        {
            try
            {
                var reservation = _context.Reservations.First(ct => ct.ReservationId == id);
                return Ok(reservation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<ReservationsController>
        [HttpPost("{prefix?}")]
        public ActionResult Post([FromBody] Reservation reservation, [FromRoute] string prefix = "CT")
        {
            try
            {
                var consecutive = _context.Consecutives.Single(consec => consec.Prefix == prefix);
                reservation.ReservationId = consecutive.GetConsecutiveCode();
                _context.Reservations.Add(reservation);
                _context.SaveChanges();
                return CreatedAtRoute("GetReservation", new { id = reservation.ReservationId }, reservation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ReservationsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Reservation reservation)
        {
            try
            {
                if (reservation.ReservationId == id)
                {
                    _context.Entry(reservation).State = EntityState.Modified;
                    _context.SaveChanges();
                    return CreatedAtRoute("GetReservation", new { id = reservation.ReservationId }, reservation);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<ReservationsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            try
            {
                var reservation = _context.Reservations.First(ct => ct.ReservationId == id);
                if (reservation != null)
                {
                    _context.Reservations.Remove(reservation);
                    _context.SaveChanges();
                    return Ok(reservation);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
